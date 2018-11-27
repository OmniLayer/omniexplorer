/**
 *
 * Asynchronously loads the component for FullBlockList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
