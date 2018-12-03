/**
 *
 * BlockList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, UncontrolledTooltip } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import { routeActions } from 'redux-simple-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { FormattedUnixDateTime, Messages as datetimeMessages } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import InformationIcon from 'react-icons/lib/io/informatcircled';
import messages from './messages';

const StyledTR = styled.tr`
  // cursor: pointer;
`;
const StyledTable = styled(Table)`
  th {
    font-weight: normal;
  }
`;

class BlockList extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const getItemKey = (item, idx) => item.timestamp.toString().concat(idx);
    const getOmniTxProps = block => {
      let txsAcumulator = 0;
      return (
        <div style={{ padding: '0.5rem 1rem' }} className="text-left">
          <strong>Property:Count</strong>
          <br/>
          {Object.keys(block.value.details).map((prop, idx) => {
            const txsCount = block.value.details[prop].tx_count;
            txsAcumulator += txsCount;
            return (
              <span key={`block${txsCount}${idx}`}>
                #{prop}: {txsCount}
                <br/>
              </span>
            );
          })}
          <span>Invalid TXs: {block.omni_tx_count - txsAcumulator}</span>
        </div>
      );
    };
    const getOmniTxValues = block => (
      <div style={{ padding: '0.5rem 1rem' }} className="text-left">
        <strong>Property:Value</strong>
        <br/>
        {Object.keys(block.value.details).map((prop, idx) => (
          <span key={idx}>
            #{prop}: $<SanitizedFormattedNumber
            value={block.value.details[prop].value_usd_rounded}
          />
            <br/>
          </span>
        ))}
      </div>
    );

    return (
      <StyledTable responsive striped hover>
        <thead>
        <tr>
          <th>
            <FormattedMessage {...messages.columns.block} />
          </th>
          <th className="text-right">
            <FormattedMessage {...messages.columns.timestamp} />
            <InformationIcon
              color="gray"
              className="ml-1"
              id="blocktimestamp"
            />
            <UncontrolledTooltip
              placement="right-end"
              target="blocktimestamp"
            >
              <FormattedMessage {...datetimeMessages.utc} />
            </UncontrolledTooltip>
          </th>
          <th className="text-right">
            <FormattedMessage {...messages.columns.txcount} />
            <InformationIcon
              color="gray"
              className="ml-1"
              id="blockListTransactionCount"
            />
            <UncontrolledTooltip
              placement="right-end"
              target="blockListTransactionCount"
            >
              <FormattedMessage {...messages.columns.txtooltip} />
            </UncontrolledTooltip>
          </th>
          <th className="text-right">
            <FormattedMessage {...messages.columns.usdvalue} />
            <InformationIcon
              color="gray"
              className="ml-1"
              id="blockListUSDValue"
            />
            <UncontrolledTooltip
              placement="right-end"
              target="blockListUSDValue"
            >
              <FormattedMessage {...messages.columns.usdtooltip} />
            </UncontrolledTooltip>
          </th>
          <th className="text-right">
            <FormattedMessage {...messages.columns.blockhash} />
          </th>
        </tr>
        </thead>
        <tbody>
        {this.props.blocks.map((block, idx) => (
          <StyledTR
            key={getItemKey(block, idx)}
            // onClick={() => this.props.changeRoute(`/block/${block.block}`)}
          >
            <td>
              <Link
                to={{
                  pathname: `/block/${block.block}`,
                  state: { state: this.props.state },
                }}
              >
                {block.block}
              </Link>
            </td>
            <td className="text-right">
              <FormattedUnixDateTime datetime={block.timestamp}/>
            </td>
            <td className="text-right">
              <span id={`omnitxcount${idx}`}>{block.omni_tx_count}</span>
              <UncontrolledTooltip
                placement="top-start"
                target={`omnitxcount${idx}`}
                autohide={false}
              >
                {getOmniTxProps(block)}
              </UncontrolledTooltip>
            </td>
            <td className="text-right">
                <span id={`totalusd${idx}`}>
                  $&nbsp;
                  <SanitizedFormattedNumber value={block.value.total_usd}/>
                </span>
              <UncontrolledTooltip
                placement="top-start"
                target={`totalusd${idx}`}
                autohide={false}
              >
                {getOmniTxValues(block)}
              </UncontrolledTooltip>
            </td>
            <td className="text-right">
              <Link
                to={{
                  pathname: `/block/${block.block}`,
                  state: { state: this.props.state },
                }}
              >
                <ColoredHash hash={block.block_hash}/>
              </Link>
            </td>
          </StyledTR>
        ))}
        </tbody>
      </StyledTable>
    );
  }
}

BlockList.propTypes = {
  blocks: PropTypes.array.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(BlockList);
