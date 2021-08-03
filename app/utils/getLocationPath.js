import {
  API_OMNILITE_URL_BASE,
  API_OMNIFEATHER_URL_BASE,
  API_TESTNET_URL_BASE,
  API_URL_BASE,
} from 'containers/App/constants';
import isTestnet from './isTestnet';
import isOmniFeather from './isOmniFeather';
import isOmiLite from './isOmniLite';

export default () => {

  if (isTestnet) {
    return API_TESTNET_URL_BASE;
  }

  if (isOmniFeather) {
    return API_OMNIFEATHER_URL_BASE;
  }

  if (isOmiLite) {
    return API_OMNILITE_URL_BASE;
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

  if (isOmiLite) {
    return '/omnilite';
  }

  return '';
};
