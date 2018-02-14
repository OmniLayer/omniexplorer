/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis';
// import styled from 'styled-components';


class TransactionHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <XYPlot
        width={600}
        height={230}
      >
        <HorizontalGridLines />
        <LineSeries
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 5 },
            { x: 3, y: 15 },
          ]}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    );
  }
}

TransactionHistory.propTypes = {};

export default TransactionHistory;
