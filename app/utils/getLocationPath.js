import {
  API_LTC_URL_BASE,
  API_OMNIFEATHER_URL_BASE,
  API_TESTNET_URL_BASE,
  API_URL_BASE,
} from 'containers/App/constants';
import isTestnet from './isTestnet';
import isOmniFeather from './isOmniFeather';
import isLTC from './isLTC';

export default () => {
  if (isTestnet) {
    return API_TESTNET_URL_BASE;
  }

  if (isOmniFeather) {
    return API_OMNIFEATHER_URL_BASE;
  }

  if (isLTC) {
    return API_LTC_URL_BASE;
  }

  return API_URL_BASE;
};

export const getSufixURL = () => {
  if (isTestnet) {
    return '/testnet';
  }

  if (isOmniFeather) {
    return '/ftc';
  }

  if (isLTC) {
    return '/ltc';
  }

  return '';
};
