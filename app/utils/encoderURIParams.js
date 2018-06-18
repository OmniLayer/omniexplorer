/**
 *
 * @param requestURL
 * @param params
 * @returns {{url: string, body: string}}
 */
export default (params) => {
  const encodeURIParam = (key, value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  return Object.keys(params).map((key) => encodeURIParam(key, params[key])).join('&');
};
