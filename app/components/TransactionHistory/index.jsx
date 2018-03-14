/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
// import { HorizontalGridLines, LineSeries, XAxis, XYPlot, YAxis } from 'react-vis';
import statsPNG from 'images/stats.png';
import styled from 'styled-components';

const IMG = styled.img``;

const ContainerLogo = styled.div`
  background-color: #f5f5f5;
`;

class TransactionHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ContainerLogo className="d-flex px-3 pb-2">
        <div className="d-inline-block mx-auto">
          <IMG src={statsPNG} />
        </div>
      </ContainerLogo>
    );
  }
}

TransactionHistory.propTypes = {};

export default TransactionHistory;
