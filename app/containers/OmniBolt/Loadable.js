/**
 *
 * Asynchronously loads the component for OmniBolt
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
