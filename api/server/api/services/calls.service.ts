import twilio from 'twilio';
import Redis from '../../common/util/redisHelper';
import Push, { ISubscription } from '../../common/util/push';

interface ICall {
  sid: string;
}

interface ICreateCallResponse {
  sid: string;
}

export enum CallStatus {
  COMPLETED = 'completed',
  NO_ANSWER = 'no-answer',
  CANCELLED = 'canceled'
}

export class CallsService {
  getCalls(): Promise<ICall[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<ICall[]>((resolve, reject) => {
      resolve([]);
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
          statusCallback:
            process.env.NODE_ENV === 'production'
              ? 'https://calls.api.marknanyang.com/api/v1/calls/status-changed'
              : 'https://1b98a9bc.ngrok.io/api/v1/calls/status-changed',
          statusCallbackEvent: ['completed', 'no-answer', 'canceled'],
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
