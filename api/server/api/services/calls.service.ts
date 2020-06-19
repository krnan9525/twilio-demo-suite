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
  startTime: string;
  from: string;
  fromFormatted: string;
  to: string;
  toFormatted: string;
  twilioNumber: string | null;
  twilioNumberFormatted: string | null;
  cost: string | null;
  costUnit: string;
  sid: string;
  duration: string;
}

interface IGetCallResponse {
  previousPageToken: string | null;
  nextPageToken: string | null;
  calls: ICall[];
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

export enum CallDirectionEnum {
  OUTBOUND_DIAL = 'outbound-dial',
  OUTBOUND_API = 'outbound-api',
  INBOUND = 'inbound'
}

export class CallsService {
  /**
   * @description service to get call logs for this account
   * @param accountSid
   * @param accessToken
   * @param pageToken
   */
  public getCalls(
    { accountSid, accessToken },
    pageToken: undefined
  ): Promise<IGetCallResponse> {
    const client = twilio(accountSid, accessToken);
    return new Promise<IGetCallResponse>((resolve, reject) => {
      const opts = {
        pageSize: 40,
        pageToken,
        pageNumber: pageToken ? 1 : undefined
      };
      return client.calls
        .page(opts)
        .then((res: CallPage) => {
          const formattedCalls = this.formatCallsForResponse(res);
          resolve({
            previousPageToken: extractPageToken(res.getPreviousPageUrl()),
            nextPageToken: extractPageToken(res.getNextPageUrl()),
            calls: formattedCalls
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   * @description service logic for connecting and forwarding calls
   */
  public createNewCall(
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
          if (subscription) {
            Redis.set(call.sid, JSON.stringify(subscription)).then(() =>
              resolve(call)
            );
          } else {
            resolve(call);
          }
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
  public changeStatus(
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
                'Your call status is changed but we cannot get its current state.';
          }

          Push(subscription, payload);
          resolve();
        })
        .catch(e => reject(e));
    });
  }

  /**
   * @description helper function -- format call instances for API return
   * @param res
   */
  private formatCallsForResponse(res: CallPage): ICall[] {
    const calls = res.toJSON().instances as CallInstance[];
    return calls
      .filter(call => call.direction === CallDirectionEnum.OUTBOUND_API)
      .map(
        (call: CallInstance): ICall => {
          const spawnedCall = calls.find(
            callToFind =>
              callToFind.parentCallSid === call.sid &&
              callToFind.direction === CallDirectionEnum.OUTBOUND_DIAL
          );
          return {
            cost: call.price ? String(Math.abs(Number(call.price))) : null,
            costUnit: call.priceUnit,
            duration: call.duration,
            twilioNumber: spawnedCall ? call.from : null,
            twilioNumberFormatted: spawnedCall ? call.fromFormatted : null,
            from: spawnedCall ? call.to : call.from,
            fromFormatted: spawnedCall ? call.toFormatted : call.fromFormatted,
            sid: call.sid,
            startTime: call.startTime.toISOString(),
            to: spawnedCall ? spawnedCall.to : call.to,
            toFormatted: spawnedCall
              ? spawnedCall.toFormatted
              : call.toFormatted
          };
        }
      );
  }
}

export default new CallsService();
