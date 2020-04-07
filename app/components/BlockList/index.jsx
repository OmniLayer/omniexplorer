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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { startFetch } from 'components/Token/actions';
import AssetLogo from 'components/AssetLogo';
import AssetLink from 'components/AssetLink';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import StyledLink from 'components/StyledLink';
import InfoCircleIcon from 'components/InfoCircleIcon';

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
  constructor(props) {
    super(props);

    const { blocks } = this.props;
    this.getDistinctTokensFromBlockList(blocks);
  }

  getDistinctTokensFromBlockList(blocks) {
    const properties = Object.values(blocks)
      .map(block => Object.keys(block.value.details))
      .flat();
    const distincts = [...new Set(properties)];
    return distincts;
  }

  // eslint-disable-line react/prefer-stateless-function
  render() {
    const getItemKey = (item, idx) => item.timestamp.toString().concat(idx);

    const invalidTxTooltipMsg = (block, txsAcumulator) =>
      block.omni_tx_count - txsAcumulator ? (
        <span>Invalid: {block.omni_tx_count - txsAcumulator}</span>
      ) : null;

    const getOmniTxProps = block => {
      let txsAcumulator = 0;
      let content;
      if (!block.omni_tx_count) {
        content = (
          <div style={{ padding: '0.5rem 1rem' }} className="text-left">
            <span>
              None
              <br />
            </span>
          </div>
        );
      } else {
        content = (
          <div style={{ padding: '0.5rem 1rem' }} className="text-left">
            {!block.value.error &&
              Object.keys(block.value.details).map((prop, idx) => {
                const txsCount = block.value.details[prop].tx_count;
                txsAcumulator += txsCount;
                return (
                  <span key={`block${txsCount}${idx}`}>
                    #{prop}: {txsCount}
                    <br />
                  </span>
                );
              })}
            {invalidTxTooltipMsg(block, txsAcumulator)}
          </div>
        );
      }

      return content;
    };

    const getOmniTxValues = block => {
      let content;
      if (!block.omni_tx_count || block.value.error) {
        content = (
          <div style={{ padding: '0.5rem 1rem' }} className="text-left">
            <span>
              $0
              <br />
            </span>
          </div>
        );
      } else {
        content = (
          <div style={{ padding: '0.5rem 1rem' }} className="text-left">
            {Object.keys(block.value.details).map((prop, idx) => (
              <span key={`prop${prop}${idx}`}>
                #{prop}: $
                <SanitizedFormattedNumber
                  value={block.value.details[prop].value_usd_rounded}
                />
                <br />
              </span>
            ))}
          </div>
        );
      }
      return content;
    };

    const getOmniTxLogos = block => {
      const logos = Object.keys(block.value.details).map((prop, idx) => {
        const key = `id${block.block}${prop}`;
        const asset = block.value.details[prop];

        return (
          <AssetLink key={key} asset={prop} state={this.props.state}>
            <AssetLogo
              asset={asset}
              prop={prop}
              style={{ width: '2rem', height: '2rem' }}
            />
          </AssetLink>
        );
      });
      return logos;
    };

    return (
      <StyledTable responsive striped hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage {...messages.columns.block} />
            </th>
            <th className="text-center">
              <FormattedMessage {...messages.columns.timestamp} />
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.txcount} />
              <InfoCircleIcon id="blockListTransactionCount" />
              <UncontrolledTooltip
                placement="right-end"
                target="blockListTransactionCount"
              >
                <FormattedMessage {...messages.columns.txtooltip} />
              </UncontrolledTooltip>
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.usdvalue} />
              <InfoCircleIcon id="blockListUSDValue" />
              <UncontrolledTooltip
                placement="right-end"
                target="blockListUSDValue"
              >
                <FormattedMessage {...messages.columns.usdtooltip} />
              </UncontrolledTooltip>
            </th>
            <th className="text-center">
              <FormattedMessage {...messages.columns.blockhash} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.blocks.map((block, idx) => (
            <StyledTR key={getItemKey(block, idx)}>
              <td>
                <StyledLink
                  to={{
                    pathname: `/block/${block.block}`,
                    state: { state: this.props.state },
                  }}
                >
                  {block.block}
                </StyledLink>
              </td>
              <td className="text-center">
                <FormattedUnixDateTime datetime={block.timestamp} />
              </td>
              <td className="text-right">
                {getOmniTxLogos(block)}
                <div
                  style={{
                    width: '3rem',
                    display: 'inline-block',
                  }}
                  id={`omnitxcount${idx}`}
                >
                  {block.omni_tx_count}
                </div>
                <UncontrolledTooltip
                  placement="right-end"
                  target={`omnitxcount${idx}`}
                  autohide={false}
                >
                  {getOmniTxProps(block)}
                </UncontrolledTooltip>
              </td>
              <td className="text-right">
                <span id={`totalusd${idx}`}>
                  $&nbsp;
                  <SanitizedFormattedNumber value={block.value.total_usd} />
                </span>
                <UncontrolledTooltip
                  placement="right-start"
                  target={`totalusd${idx}`}
                  autohide={false}
                >
                  {getOmniTxValues(block)}
                </UncontrolledTooltip>
              </td>
              <td className="text-center">
                <StyledLink
                  to={{
                    pathname: `/block/${block.block}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={block.block_hash} />
                </StyledLink>
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
  getProperty: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getProperty: propertyId => dispatch(startFetch(propertyId)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  // properties: state => makeSelectProperty(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BlockList);
