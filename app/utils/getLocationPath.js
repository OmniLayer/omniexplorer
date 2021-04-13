import { API_TESTNET_URL_BASE, API_URL_BASE } from 'containers/App/constants';
import isTestnet from './isTestnet';

export default () => (isTestnet ? API_TESTNET_URL_BASE : API_URL_BASE);

export const getSufixURL = () =>
  window.location.href.includes('testnet') ? '/testnet' : '';
