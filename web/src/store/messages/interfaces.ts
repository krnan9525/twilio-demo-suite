import { AuthInterface } from '@/store/sharedState';

export interface MessageInterface {
  sid: string;
  from: string;
  to: string;
  body: string;
  num_segments: string;
  direction: string;
  date_updated: string;
  price: string;
  price_unit: string;
  date_sent: string;
  status: string;
}

export interface NextPageTokensInterface {
  pageToken1?: string;
  pageToken2?: string;
}

export interface MessagesStateInterface {
  messages: MessageInterface[];
  nextPageTokens: NextPageTokensInterface;
  loadingMessages: boolean;
  sendingMessage: boolean;
}

export const MESSAGES_MUTATION_TYPES = {
  APPEND_MESSAGES: 'APPEND_MESSAGES',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SET_LOADING_MESSAGES: 'SET_LOADING_MESSAGES',
  SET_NEXT_PAGE_TOKENS: 'SET_NEXT_PAGE_TOKENS',
  RESET_MESSAGE_STATE: 'RESET_MESSAGE_STATE',
  SET_SENDING_MESSAGE: 'SET_SENDING_MESSAGE'
};

export const MESSAGES_ACTION_TYPES = {
  FETCH_MESSAGES_FOR_NUMBER: 'FETCH_MESSAGES_FOR_NUMBER',
  SEND_NEW_MESSAGE: 'SEND_NEW_MESSAGE'
  // FETCH_MESSAGES_FOR_CONVERSATION: 'FETCH_MESSAGES_FOR_CONVERSATION',
  // FETCH_RECENT_MESSAGES: 'FETCH_RECENT_MESSAGES'
};

export const MESSAGE_GETTER_TYPES = {
  UNIQUE_NUMBERS: 'UNIQUE_NUMBERS',
  MAPPED_MESSAGES: 'MAPPED_MESSAGES'
};

// action and network interfaces

export interface FetchMessagePayloadInterface extends AuthInterface {
  from?: string;
  to?: string;
  pageToken1?: string;
  pageToken2?: string;
}

export interface FetchMessageResponseInterface {
  messages: MessageInterface[];
  nextPageToken1: string;
  nextPageToken2: string;
}

export interface CreateSmsPayloadInterface extends AuthInterface {
  messageBody: string;
  from: string;
  to: string;
}

export interface CreateSmsResponseInterface extends AuthInterface {}

// getter interfaces
export interface MappedMessagesInterface {
  [key: string]: MessageInterface[];
}
