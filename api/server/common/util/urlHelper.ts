import querystring from 'querystring';

/**
 * @param url
 */
export const extractPageToken = (url: string): null | string => {
  const queries = querystring.decode(url);
  return (queries.PageToken as string) || null;
  // const regex = /[?|&]PageToken=([\w]+)&?/;
  // const res = regex.exec(url);
  // if (res && res.length >= 2) return res[1];
  // return null;
};
