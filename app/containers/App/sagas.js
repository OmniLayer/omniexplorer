import injectSaga from 'utils/injectSaga';
import tokenSaga from 'components/Token/saga';
import statusSaga from 'components/ServiceBlock/saga';

const sagas = [
  injectSaga({ key: 'tokenDetail', saga: tokenSaga }),
  injectSaga({ key: 'status', saga: statusSaga }),
];

export default sagas;
