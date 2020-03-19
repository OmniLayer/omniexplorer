/**
 *
 * Exchange
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import DExHistory from 'components/DExHistory';
import DExOrderBook from 'components/DExOrderBook';
import DExOrders from 'components/DExOrders';
import DExPairs from 'components/DExPairs';

import makeSelectExchange from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Exchange() {
  useInjectReducer({
    key: 'exchange',
    reducer,
  });
  useInjectSaga({
    key: 'exchange',
    saga,
  });

  return (
    <div>
      <FormattedMessage {...messages.header} />
      <DExPairs />
      <DExHistory />
      <DExOrders />
      <DExOrderBook />
    </div>
  );
}

Exchange.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  exchange: makeSelectExchange(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Exchange);
