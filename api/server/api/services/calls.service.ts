import twilio from 'twilio';
import Redis from '../../common/util/redisHelper';
import Push, { ISubscription } from '../../common/util/push';
import { hostUrl } from '../consts';
import {
  CallInstance,
  CallPage,
  CallStatus as TwilioCallStatus
} from 'twilio/lib/rest/api/v2010/account/call';
import { extractPageToken } from '../../common/util/urlHelper';

interface ICall {
  sid: string;
  from: string;
  fromFormatted: string;
  parentCallSid: string | null;
  dateCreated: Date;
  direction: string;
  duration: string;
  endTime: Date;
  startTime: Date;
  status: TwilioCallStatus;
  to: string;
  toFormatted: string;
  uri: string;
  cost: null | number;
  costUnit: string;
}

interface IGetCallResponse {
  previousPageToken: string | null;
  nextPageToken: string | null;
  calls: ICall;
}

interface ICreateCallResponse {
  sid: string;
}

export enum CallStatus {
  COMPLETED = 'completed',
  NO_ANSWER = 'no-answer',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  BUSY = 'busy'
}

export class CallsService {
  getCalls(
    { accountSid, accessToken },
    pageToken: undefined
  ): Promise<IGetCallResponse> {
    const client = twilio(accountSid, accessToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<IGetCallResponse>((resolve, reject) => {
      return client.calls
        .page({ pageToken, pageSize: 10 })
        .then((res: CallPage) => {
          resolve({
            previousPageToken: extractPageToken(res.getPreviousPageUrl()),
            nextPageToken: extractPageToken(res.getNextPageUrl()),
            calls: res.toJSON().instances.map(call => ({
              sid: call.sid,
              from: call.from,
              parentCallSid: call.parentCallSid,
              fromFormatted: call.fromFormatted,
              dateCreated: call.dateCreated,
              direction: call.direction,
              duration: call.duration,
              endTime: call.endTime,
              startTime: call.startTime,
              status: call.status,
              to: call.to,
              toFormatted: call.toFormatted,
              uri: call.uri,
              cost: call.price,
              costUnit: call.priceUnit || 'USD'
            }))
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   * @description service logic for connecting and forwarding calls
   */
  createNewCall(
    { accountSid, accessToken, connectNumber, hostNumber, twilioNumber },
    subscription: ISubscription
  ): Promise<ICreateCallResponse> {
    const client = twilio(accountSid, accessToken);
    const voiceResponse = new twilio.twiml.VoiceResponse();
    voiceResponse.say(
      `Your call is now connected to ${connectNumber &&
        connectNumber.split('').join(' ')}`
    );
    voiceResponse.dial({}, connectNumber);

    return new Promise<ICreateCallResponse>((resolve, reject) => {
      client.calls
        .create({
          twiml: voiceResponse.toString(),
          from: twilioNumber,
          to: hostNumber,
          statusCallback: hostUrl + 'api/v1/calls/status-changed',
          statusCallbackEvent: [
            'completed',
            'no-answer',
            'cancelled',
            'failed',
            'busy'
          ],
          statusCallbackMethod: 'POST'
        })
        .then(call => {
          // TODO: reform this
          // L.debug(call);
          Redis.set(call.sid, JSON.stringify(subscription)).then(() =>
            resolve(call)
          );
        })
        .catch(e => reject(e));
    });
  }

  /**
   * @description service helper for change status calls
   * @param callSid
   * @param status
   * @param duration
   */
  changeStatus(
    callSid: string,
    status: CallStatus,
    duration: string | number
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Redis.get(callSid)
        .then(res => {
          const subscription: ISubscription = JSON.parse(res);
          let payload: string;
          switch (status) {
            case CallStatus.CANCELLED:
              payload = `Your call is cancelled by operator.`;
              break;
            case CallStatus.COMPLETED:
              payload = `Your call just finished with the duration of: ${duration} seconds.`;
              break;
            case CallStatus.NO_ANSWER:
              payload = 'Your call is finished without any answer.';
              break;
            default:
              payload =
                'Your call status is changed but we cannot get it current state.';
          }

          Push(subscription, payload);
          resolve();
        })
        .catch(e => reject(e));
    });
  }
}

export default new CallsService();
