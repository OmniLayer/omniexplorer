/**
 *
 * Asynchronously loads the component for CrowdsaleDetail
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
