import {
  MessageInstance,
  MessageListInstanceOptions
} from 'twilio/lib/rest/api/v2010/account/message';
import axios from 'axios';
import { publicTwilioEndpoint2010 } from '../consts';
import { extractPageToken } from '../../common/util/urlHelper';

export interface SmsFilterInterface extends MessageListInstanceOptions {
  pageToken1?: string;
  pageToken2?: string;
}

export interface MessagesWithPaginationInterface {
  messages: MessageInstance[];
  nextPageToken1: string;
  nextPageToken2: string;
}

class SmsService {
  /**
   * @description get sms by umber
   * @param accountSid
   * @param accessToken
   * @param filter
   */
  public getSmsByNumber(
    accountSid: string,
    accessToken: string,
    filter: SmsFilterInterface
  ): Promise<MessagesWithPaginationInterface> {
    return new Promise((resolve, reject) => {
      const axiosParams = this.composeParams(filter);

      Promise.all(
        axiosParams.map(param =>
          axios.get(
            `${publicTwilioEndpoint2010}Accounts/${accountSid}/Messages.json`,
            {
              auth: {
                username: accountSid,
                password: accessToken
              },
              params: param
            }
          )
        )
      )
        .then(resArr => {
          const response = resArr.reduce(
            (previousValue, currentValue, index) => {
              previousValue.messages = previousValue.messages.concat(
                currentValue.data.messages
              );
              previousValue['nextPageToken' + Number(index + 1)] =
                extractPageToken(currentValue.data.next_page_uri) || 'empty';
              return previousValue;
            },
            {
              messages: []
            } as MessagesWithPaginationInterface
          );
          resolve(response);
        })
        .catch(e => reject(e));
    });
  }

  private composeParams(filter: SmsFilterInterface) {
    let axiosParams = [];
    if (!filter.from && !filter.to) {
      filter.pageToken1 !== 'empty' &&
        (axiosParams = [
          {
            PageSize: 20,
            ...(filter.pageToken1 && { PageToken: filter.pageToken1 })
          }
        ]);
    } else if (filter.from && !filter.to) {
      // fetching messages for one twilio number to all non-twilio numbers
      // fetch both incoming and outgoing messages
      axiosParams = [
        ...[
          filter.pageToken1 !== 'empty'
            ? {
                PageSize: 20,
                From: filter.from,
                ...(filter.pageToken1 && { PageToken: filter.pageToken1 })
              }
            : null
        ],
        ...[
          filter.pageToken2 !== 'empty'
            ? {
                PageSize: 20,
                To: filter.from,
                ...(filter.pageToken2 && { PageToken: filter.pageToken2 })
              }
            : null
        ]
      ];
    } else if (filter.from && filter.to) {
      // fetching messages for one twilio number to one non-twilio number
      axiosParams = [
        ...[
          filter.pageToken1 !== 'empty'
            ? {
                PageSize: 20,
                From: filter.from,
                To: filter.to,
                ...(filter.pageToken1 && { PageToken: filter.pageToken1 })
              }
            : null
        ],
        ...[
          filter.pageToken2 !== 'empty'
            ? {
                PageSize: 20,
                From: filter.to,
                To: filter.from,
                ...(filter.pageToken2 && { PageToken: filter.pageToken2 })
              }
            : null
        ]
      ];
    }
    return axiosParams;
  }
}

export default new SmsService();
