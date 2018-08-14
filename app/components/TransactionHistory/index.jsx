/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import {
  Hint,
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  makeWidthFlexible,
} from 'react-vis';

// import styled from 'styled-components';
// https://github.com/uber/react-vis/blob/master/docs/flexible-plots.md#/examples/charts/responsive-vis
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.rememberValue = this.rememberValue.bind(this);
    this.forgetValue = this.forgetValue.bind(this);
  }
  rememberValue = (value, ...rest) => {
    console.log(rest)
    console.log('value', value);
    this.setState({ value });
  };
  
  forgetValue = () => {
    this.setState({
      value: null,
    });
  };
  // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (isEmpty(this.props) || isEmpty(this.props.status) || isEmpty(this.props.status.txdaily)) {
      return null;
    }
  
    const { value } = this.state;
    const txdaily = this.props.status.txdaily;

    const data = sortBy(
      txdaily.map(day => ({
        y: parseFloat(day.count),
        x: new Date(day.date).getTime(),
      })),
      'date',
    );
    
    const tickFormat = (d)=>{
      const dt = new Date(d).toLocaleDateString();
      return dt.slice(0, dt.lastIndexOf("/"));
    };

    return (
      <FlexibleXYPlot
        height={(this.props.height || 230)}
        margin={{left: 48}}
        hideLine
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries
          data={data}
          style={{
            stroke: 'violet',
            strokeWidth: 3,
          }}
        />
        <XAxis
          attr="x"
          attrAxis="y"
          title="Period of time(days)"
          tickFormat={tickFormat}
          tickLabelAngle={0}
        />
        <YAxis
          attr="y"
          attrAxis="x"
          orientation="left"
          title="Number of transactions"
        />
        {value ? <Hint value={value} /> : null}
      </FlexibleXYPlot>
    );
  }
}

TransactionHistory.propTypes = {
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(withConnect)(TransactionHistory);
