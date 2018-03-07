/**
 *
 * Asynchronously loads the component for AddressDetail
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
