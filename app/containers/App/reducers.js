import injectReducer from 'utils/injectReducer';
import tokenReducer from 'components/Token/reducer';
import statusReducer from 'components/ServiceBlock/reducer';

const reducers = [
  injectReducer({ key: 'tokenDetail', reducer: tokenReducer }),
  injectReducer({ key: 'status', reducer: statusReducer }),
];

export default reducers;
export const initialState = {};
