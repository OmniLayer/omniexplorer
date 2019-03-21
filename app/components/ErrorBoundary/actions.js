import {
  ERROR_BACKEND_LAGGED,
} from './constants';

export const backendLagged = () => ({
  type: ERROR_BACKEND_LAGGED,
});
