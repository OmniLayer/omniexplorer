/**
 *
 * Asynchronously loads the component for Exchange
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
