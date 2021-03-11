/**
 *
 * Asynchronously loads the component for OmniBOLT
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
