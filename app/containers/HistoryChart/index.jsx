/**
 *
 * HistoryChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TransactionHistory from 'components/TransactionHistory';

import styled from 'styled-components';
const Chart = styled(TransactionHistory)`
  left: 25px;
`;

export class HistoryChart extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  
  render() {
    return (
      <div>
        <Chart height={400} />
      </div>
    );
  }
}

HistoryChart.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryChart);
