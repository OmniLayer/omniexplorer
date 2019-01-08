/**
 *
 * Asynchronously loads the component for Blocks
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
