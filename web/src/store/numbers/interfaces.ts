import { AuthInterface } from '@/store/sharedState';

interface NumberCapacityDirectionInterface {
  in: boolean;
  out: boolean;
}

export interface NumberInterface {
  sid: string;
  friendlyName: string;
  number: string;
  country: string;
  voiceEnabled: NumberCapacityDirectionInterface;
  smsEnabled: NumberCapacityDirectionInterface;
  mmsEnabled: NumberCapacityDirectionInterface;
}

export interface NumberToBuyInterface {
  isoCountry: string;
  number: string;
  voiceEnabled: boolean;
  smsEnabled: boolean;
  mmsEnabled: boolean;
}

export interface SearchNumbersToBuyParamsInterface extends AuthInterface {
  country: string;
  type: string;
}

export interface BuyNumberParamsInterface extends AuthInterface {
  number: string;
}

export interface NumberStateInterface {
  availableNumbers: NumberInterface[];
  numbersToBuy: NumberToBuyInterface[];
  countryList: CountryInterface[];
  smsSelectedNumber: string;
  smsReceiverNumber: string;
  loadingNumbers: boolean;
  loadingBuyNumber: boolean;
}

export interface CountryInterface {
  country: string;
  countryCode: string;
  supportedTypes: string[];
}

export const NUMBER_MUTATION_TYPES = {
  SET_AVAILABLE_NUMBERS: 'SET_AVAILABLE_NUMBERS',
  SET_COUNTRY_LIST: 'SET_COUNTRY_LIST',
  SET_NUMBERS_TO_BUY: 'SET_NUMBERS_TO_BUY',
  SET_NUMBER_LOADING: 'SET_NUMBER_LOADING',
  SET_SMS_SELECTED_NUMBER: 'CHANGE_SELECTED_NUMBER',
  SET_SMS_RECEIVER_NUMBER: 'SET_SMS_RECEIVER_NUMBER',
  SET_LOADING_BUY_NUMBER: 'SET_LOADING_BUY_NUMBER'
};

export const NUMBER_ACTION_TYPES = {
  FETCH_NUMBERS: 'FETCH_NUMBERS',
  FORCE_FETCH_NUMBERS: 'FORCE_FETCH_NUMBERS',
  FETCH_COUNTRIES: 'FETCH_COUNTRIES',
  FETCH_NUMBERS_TO_BUY: 'FETCH_NUMBERS_TO_BUY',
  BUY_NEW_NUMBER: 'BUY_NEW_NUMBER'
};
