import {
  API_OMNIFEATHER_URL_BASE,
  API_TESTNET_URL_BASE,
  API_URL_BASE,
} from 'containers/App/constants';
import isTestnet from './isTestnet';
import isOmniFeather from './isOmniFeather';

export default () => {
  if (isTestnet) {
    return API_TESTNET_URL_BASE;
  }

  if (isOmniFeather) {
    return API_OMNIFEATHER_URL_BASE;
  }

  return API_URL_BASE;
};

export const getSufixURL = () => {
  if (window.location.href.includes('testnet')) {
    return '/testnet';
  }

  if (window.location.href.includes('ftc')) {
    return '/ftc';
  }

  return '';
};
