/* eslint-disable global-require,camelcase */
import { OMNI_FIRST_BLOCK, FTC_FIRST_BLOCK, LTC_FIRST_BLOCK } from 'containers/App/constants';
import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';

export default () => {
  if (isOmniFeather) {
    return FTC_FIRST_BLOCK;
  }
  if (isLTC) {
    return LTC_FIRST_BLOCK;
  }
  return OMNI_FIRST_BLOCK;
};
