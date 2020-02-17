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
import styled from 'styled-components';

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
const StyledUnderline = styled.span`
  height: 1rem;
  margin: 1px;
  display: inline-block;
  vertical-align: middle;
  overflow: visible;
`;

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
      <StyledUnderline
        style={{
          borderLeft: `0.3rem solid ${props.color}`,
        }}
      />
    );
    const crosshairContent = () => {
      if (!crosshairValues || !crosshairValues.length) return null;

      const content = (
        <div
          className="inline-block p-1 rounded bg-transparent text-dark"
          style={{ width: '11rem' }}
        >
          <strong className="d-block">
            {moment.utc(crosshairValues[0].x).format('M/D/Y')}
          </strong>
          <LegendUnderline color="violet" className="d-inline-block"/>
          <span className="d-inline-block">
            TXs:&nbsp;
            {
              <SanitizedFormattedNumber value={crosshairValues[0].y / 10000} />
            }
          </span>
          <br/>
          <LegendUnderline color="green" className="d-inline-block"/>
          <span className="d-inline-block">
            USD:&nbsp;
            {
              <span>
                $&nbsp;<SanitizedFormattedNumber value={crosshairValues[1].y} />
              </span>
            }
          </span>
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
            title="Transactions & Value"
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
