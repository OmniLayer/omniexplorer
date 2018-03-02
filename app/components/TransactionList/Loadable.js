/**
 *
 * Asynchronously loads the component for Transactions
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
