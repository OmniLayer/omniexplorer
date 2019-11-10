import {useInjectSaga} from 'utils/injectSaga';
import tokenSaga from 'components/Token/saga';
import statusSaga from 'components/ServiceBlock/saga';

const sagas = [
  useInjectSaga({ key: 'tokenDetail', saga: tokenSaga }),
  useInjectSaga({ key: 'status', saga: statusSaga }),
];

export default sagas;
