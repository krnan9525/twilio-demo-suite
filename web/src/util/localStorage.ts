import { LocalStorageEnums } from '@/common/enums';
import { AuthInterface } from '@/store/sharedState';

export const getCredentialFromLocalStorage = () => {
  const accountSid = localStorage.getItem(LocalStorageEnums.SID);
  const accessToken = localStorage.getItem(LocalStorageEnums.TOKEN);
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
