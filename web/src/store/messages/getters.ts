import {
  MappedMessagesInterface,
  MESSAGE_GETTER_TYPES,
  MessagesStateInterface
} from './interfaces';
import { GetterTree } from 'vuex';
import { NumberInterface } from '@/store/numbers/interfaces';
import moment from 'moment';

const getters: GetterTree<MessagesStateInterface, any> = {
  [MESSAGE_GETTER_TYPES.UNIQUE_NUMBERS](state, thisGetters, rootState) {
    const { messages } = state;
    const twilioNumbers = rootState.numbers.availableNumbers.map(
      (number: NumberInterface) => number.number
    );
    return messages.reduce((prev: string[], curr) => {
      // filter out all twilio owned numbers
      if (twilioNumbers.indexOf(curr.from) >= 0) {
        if (prev.indexOf(curr.to) < 0) {
          prev.push(curr.to);
        }
      } else {
        if (prev.indexOf(curr.from) < 0) {
          prev.push(curr.from);
        }
      }
      return prev;
    }, []);
  },

  [MESSAGE_GETTER_TYPES.MAPPED_MESSAGES](state, thisGetters) {
    const { messages } = state;
    const uniqueNumbers: string[] =
      thisGetters[MESSAGE_GETTER_TYPES.UNIQUE_NUMBERS];
    return messages
      .map(message => ({
        ...message,
        formattedDate: moment(message.date_sent).format('L LT')
      }))
      .reduce((prev: MappedMessagesInterface, curr) => {
        let foundNumber;
        if (uniqueNumbers.indexOf(curr.from) >= 0) {
          foundNumber = curr.from;
        } else {
          foundNumber = curr.to;
        }
        if (!prev[foundNumber]) {
          prev[foundNumber] = [];
        }
        prev[foundNumber].push(curr);
        return prev;
      }, {});
  }
};

export default getters;
