import {
  ERROR_BACKEND_LAGGED,
  ERROR_CLEAN,
} from './constants';

export function errorClean() {
  return {
    type: ERROR_CLEAN,
  };
}

export const backendLagged = () => ({
  type: ERROR_BACKEND_LAGGED,
});
