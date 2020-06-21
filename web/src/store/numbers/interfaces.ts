export interface NumberInterface {
  sid: string;
  friendlyName: string;
  number: string;
  country: string;
}

export interface NumberStateInterface {
  availableNumbers: NumberInterface[];
  smsSelectedNumber: string;
  smsReceiverNumber: string;
  loadingNumbers: boolean;
}

export const NUMBER_MUTATION_TYPES = {
  AVAILABLE_NUMBER: 'AVAILABLE_NUMBER',
  CHANGE_NUMBER_LOADING: 'CHANGE_NUMBER_LOADING',
  CHANGE_SMS_SELECTED_NUMBER: 'CHANGE_SELECTED_NUMBER',
  CHANGE_SMS_RECEIVER_NUMBER: 'CHANGE_SMS_RECEIVER_NUMBER'
};

export const NUMBER_ACTION_TYPES = {
  FETCH_NUMBERS: 'FETCH_NUMBERS'
};
