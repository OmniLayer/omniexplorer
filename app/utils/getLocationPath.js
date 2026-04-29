import { API_TESTNET_URL_BASE, API_URL_BASE } from 'containers/App/constants';
import isTestnet from './isTestnet';

export default () => {
  if (isTestnet) {
    return API_TESTNET_URL_BASE;
  }

  return API_URL_BASE;
};

export const getSufixURL = () => {
  if (isTestnet) {
    return '/testnet';
  }

  return '';
};
