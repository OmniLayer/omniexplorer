import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

/**
 * encodeURIParams
 * @param params
 * @param addEmpties
 * @returns {string}
 */
export default (params, addEmpties = false) => {
  const encodeURIParam = (key, value) =>
    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  // filters empty params if apply
  // recovery keys of params to encode
  // encode key value pairs
  // concat results
  const cleanParams = addEmpties ? params : pickBy(params, identity);
  return Object.keys(cleanParams)
    .map(key => encodeURIParam(key, cleanParams[key]))
    .join('&');
};
