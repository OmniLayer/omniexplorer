/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment/src/moment';
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
// https://github.com/uber/react-vis/issues/834 //Axis Values are Slightly Off #834
// https://github.com/uber/react-vis/issues/288
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class TransactionHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      crosshairValues: {
        count: [],
        usd: [],
      },
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
        y: parseFloat(day.count)*10000,
        x: moment.utc(day.date).valueOf(),
      })),
      'date',
    );
    // const parseVal = (val) => val.toFixed ? propsValue.toFixed(8) : parseFloat(propsValue, 10).toString();
    this.usdData = sortBy(
      txdaily.map(day => ({
        y: parseFloat(day.value_24hr),
        x: moment.utc(day.date).valueOf(),
      })),
      'date',
    );

    const tickFormat = d => {
      const dt = moment.utc(d);
      return dt.format('M/D');
    };

    const { crosshairValues } = this.state;

    return (
      <FlexibleXYPlot
        animation
        height={this.props.height || 230}
        margin={{ left: 48 }}
        onMouseLeave={() => this.setState({ crosshairValues:{count: null, usd: null }})}
        hideLine
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <LineSeries
          data={this.data}
          style={{
            stroke: 'violet',
            strokeLinejoin: 'round',
            strokeWidth: 3,
          }}
          onNearestX={(value, { index }) =>
            this.setState({ crosshairValues:{count: [value] }})
          }
        />
        <LineSeries
          data={this.usdData}
          style={{
            stroke: 'green',
            strokeWidth: 3,
            strokeLinejoin: 'round',
          }}
          onNearestX={(value, { index }) =>
            this.setState({ crosshairValues:{usd: [value] }})
          }
        />
        <XAxis
          attr="x"
          attrAxis="y"
          title="By Days"
          tickFormat={tickFormat}
          tickLabelAngle={0}
          tickValues={this.data.slice(1, -1).map(record => record.x)}
        />
        <YAxis
          attr="y"
          attrAxis="x"
          orientation="left"
          title="USD & Transactions"
        />
        {crosshairValues.count && (
          <Crosshair
            values={crosshairValues.count}
            titleFormat={d => ({
              title: 'Date',
              value: moment.utc(d[0].x).format('M/D/Y'),
            })}
            itemsFormat={d => [
              {
                title: 'Transactions',
                value: d[0].y,
              },
            ]}
          />
        )}
        {crosshairValues.usd && (
          <Crosshair
            values={crosshairValues.usd}
            titleFormat={d => ({
              title: 'Date',
              value: moment.utc(d[0].x).format('M/D/Y'),
            })}
            itemsFormat={d => [
              {
                title: 'Value',
                value: `$ ${d[0].y}`,
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
