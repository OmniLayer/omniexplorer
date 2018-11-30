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

import { FormattedUnixDateTime } from 'components/FormattedDateTime';
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
    return (
      <StyledTable responsive striped hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage {...messages.columns.block} />
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.timestamp} />
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
                <FormattedUnixDateTime datetime={block.timestamp} />
              </td>
              <td className="text-right">{block.omni_tx_count}</td>
              <td className="text-right">
                $&nbsp;<SanitizedFormattedNumber value={block.value.total_usd} forceDecimals={true}/>
              </td>
              <td className="text-right">
                <Link
                  to={{
                    pathname: `/block/${block.block}`,
                    state: { state: this.props.state },
                  }}
                >
                  <ColoredHash hash={block.block_hash} />
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
