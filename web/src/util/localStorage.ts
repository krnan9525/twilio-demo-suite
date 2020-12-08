import { LocalStorageEnums } from '@/common/enums';
import {
  AuthInterface,
  TokenAuthInterface,
  VoipDataStorageInterface
} from '@/store/sharedState';

export const getCredentialFromLocalStorage = () => {
  const accountSid = localStorage.getItem(LocalStorageEnums.SID || '');
  const accessToken = localStorage.getItem(LocalStorageEnums.TOKEN || '');
  return {
    accountSid,
    accessToken
  };
};

export const saveCredentialToLocalStorage = (obj: AuthInterface) => {
  const accountSid = obj.accountSid;
  const accessToken = obj.accessToken;
  localStorage.setItem(LocalStorageEnums.SID, accountSid);
  localStorage.setItem(LocalStorageEnums.TOKEN, accessToken);
};

export const getVoIpDataFromLocalStorage = (): VoipDataStorageInterface => {
  const apiKey = localStorage.getItem(LocalStorageEnums.API_KEY || '');
  const apiSecret = localStorage.getItem(LocalStorageEnums.API_TOKEN || '');
  const twiMlAppSid = localStorage.getItem(
    LocalStorageEnums.TWIML_APP_SID || ''
  );
  return {
    apiKey: apiKey || '',
    apiSecret: apiSecret || '',
    twiMlAppSid: twiMlAppSid || ''
  };
};

export const saveVoIpDataToLocalStorage = (obj: VoipDataStorageInterface) => {
  const apiKey = obj.apiKey;
  const apiSecret = obj.apiSecret;
  const twiMlAppSid = obj.twiMlAppSid;
  apiKey && localStorage.setItem(LocalStorageEnums.API_KEY, apiKey);
  apiSecret && localStorage.setItem(LocalStorageEnums.API_TOKEN, apiSecret);
  twiMlAppSid &&
    localStorage.setItem(LocalStorageEnums.TWIML_APP_SID, twiMlAppSid);
};

export const getTokenAuthFromLocalStorage = (): TokenAuthInterface => {
  const apiKey = localStorage.getItem(LocalStorageEnums.API_KEY || '');
  const apiSecret = localStorage.getItem(LocalStorageEnums.API_TOKEN || '');
  return {
    apiKey: apiKey || '',
    apiSecret: apiSecret || ''
  };
};

export const clearStorage = () => {
  localStorage.clear();
};
