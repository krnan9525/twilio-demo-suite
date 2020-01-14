/**
 * @param url
 */
export const extractPageToken = (url: string): null | string => {
  const regex = /[?|&]PageToken=([\w]+)&?/;
  const res = regex.exec(url);
  if (res && res.length >= 2) return res[1];
  return null;
};
