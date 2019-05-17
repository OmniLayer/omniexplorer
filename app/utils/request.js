import 'whatwg-fetch';
import axios from 'axios';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  // return response.json();
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status < 200 || response.status >= 300 || response.error) {
    const error = new Error(response.msg || response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

/**
 * Build options for the request
 * @param options
 * @returns {object}
 */
function getOptions(options) {
  return {
    method: 'get',
    ...options,
  };
}

function ajax(url, options) {
  const result = axios({ url, ...options });
  return result;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, opts) {
  const options = getOptions(opts);

  return ajax(url, options)
  .then(checkStatus)
  .then(parseJSON);
}
