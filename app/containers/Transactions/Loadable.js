/**
 *
 * Asynchronously loads the component for Transaction List
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
