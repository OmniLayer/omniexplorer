/**
 *
 * Asynchronously loads the component for TransactionHistory
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
