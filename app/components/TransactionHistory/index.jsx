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
  Crosshair,
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';

// https://github.com/uber/react-vis/blob/master/docs/flexible-plots.md#/examples/charts/responsive-vis
// https://uber.github.io/react-vis/documentation/api-reference/crosshair
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      crosshairValues: [],
    };
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    // wait status props loading
    if (
      isEmpty(this.props) ||
      isEmpty(this.props.status) ||
      isEmpty(this.props.status.txdaily)
    ) {
      return null;
    }

    const { txdaily } = this.props.status;
    this.data = sortBy(
      txdaily.map(day => ({
        y: parseFloat(day.count),
        x: new Date(day.date).getTime(),
      })),
      'date',
    );

    const tickFormat = d => {
      const dt = new Date(d).toLocaleDateString();
      return dt.slice(0, dt.lastIndexOf('/'));
    };

    const { crosshairValues } = this.state;

    return (
      <FlexibleXYPlot
        animation
        height={this.props.height || 230}
        margin={{ left: 48 }}
        onMouseLeave={() => this.setState({ crosshairValues: null })}
        hideLine
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries
          data={this.data}
          style={{
            stroke: 'violet',
            strokeWidth: 3,
          }}
          onNearestXY={(value, { index }) =>
            this.setState({ crosshairValues: [value] })
          }
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
        {crosshairValues && (
          <Crosshair
            values={crosshairValues}
            titleFormat={d => ({
              title: 'Date',
              value: new Date(d[0].x).toLocaleDateString(),
            })}
            itemsFormat={d => [
              {
                title: 'Transactions',
                value: d[0].y,
              },
            ]}
          />
        )}
      </FlexibleXYPlot>
    );
  }
}

TransactionHistory.propTypes = {
  status: PropTypes.object,
  height: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(withConnect)(TransactionHistory);
