/**
 *
 * Asynchronously loads the component for BlockFullList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
