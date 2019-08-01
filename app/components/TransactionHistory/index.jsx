import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment/src/moment';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import LoadingIndicator from 'components/LoadingIndicator';

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

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
    };
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({ crosshairValues: [] });
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  onNearestX = (value, { index }) => {
    const DATA = [this.data, this.usdData];
    this.setState({ crosshairValues: DATA.map(d => d[index]) });
  };

  render() {
    if (
      isEmpty(this.props) ||
      isEmpty(this.props.status) ||
      isEmpty(this.props.status.txdaily)
    ) {
      return <LoadingIndicator />;
    }

    const { txdaily } = this.props.status;
    this.data = sortBy(
      txdaily.map(day => ({
        y: parseFloat(day.count) * 10000,
        x: moment.utc(day.date).valueOf(),
      })),
      'date',
    );

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

    const DATA = [this.data, this.usdData];
    const { crosshairValues } = this.state;
    const LegendUnderline = props => (
      <span
        className="rv-discrete-color-legend-item__color w-50"
        style={{
          background: `${props.color}`,
          height: '0.2rem',
        }}
      />
    );
    const crosshairContent = () => {
      if (!crosshairValues || !crosshairValues.length) return null;

      const content = (
        <div
          className="inline-block p-1 rounded bg-dark text-white"
          style={{ width: '9rem' }}
        >
          <strong className="d-block">
            Date: {moment.utc(crosshairValues[0].x).format('M/D/Y')}
          </strong>
          <br />
          <span className="d-block">
            USD:{' '}
            {
              <span>
                $&nbsp;<SanitizedFormattedNumber value={crosshairValues[1].y} />
              </span>
            }
          </span>
          <LegendUnderline color="green" />
          <span className="d-block">TXs: {crosshairValues[0].y / 10000}</span>
          <LegendUnderline color="violet" />
        </div>
      );

      return content;
    };

    return (
      <div>
        <FlexibleXYPlot
          animation
          height={this.props.height || 230}
          margin={{ left: 0 }}
          onMouseLeave={this._onMouseLeave}
          hideLine
        >
          <VerticalGridLines />
          <HorizontalGridLines />
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
            hideTicks
          />
          <LineSeries
            onNearestX={this.onNearestX}
            data={DATA[0]}
            style={{
              stroke: 'violet',
              strokeLinejoin: 'round',
              strokeWidth: 3,
            }}
          />
          <LineSeries
            data={DATA[1]}
            style={{
              stroke: 'green',
              strokeWidth: 3,
              strokeLinejoin: 'round',
            }}
          />
          <Crosshair values={crosshairValues}>{crosshairContent()}</Crosshair>
        </FlexibleXYPlot>
      </div>
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
