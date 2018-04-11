/**
 *
 * Asynchronously loads the component for Crowdsales
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
