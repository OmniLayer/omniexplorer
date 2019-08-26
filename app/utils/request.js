import 'whatwg-fetch';

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
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status < 200 || response.status >= 300 || response.error) {
    let error;
    let text;
    try {
      error = await response.clone().json(); // Fetch the resource
      text = await response.clone().text(); // Parse it as text
      const data = JSON.parse(text); // Try to parse it as json again
    } catch (err) {
      // This probably means the response is a HTML document
    }
    const errMsg = response.error || (error && error.msg) || response.statusText || await response.clone().text();
    const err = new Error(errMsg);
    if (text) err.text = text;
    throw err;
  }
  
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, {
    ...options,
    mode: 'cors',
  })
    .then(checkStatus)
    .then(parseJSON);
}
