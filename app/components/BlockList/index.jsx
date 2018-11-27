/**
 *
 * BlockList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'reactstrap';

import { FormattedMessage } from 'react-intl';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';

import messages from './messages';
import { routeActions } from 'redux-simple-router';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import ColoredHash from 'components/ColoredHash';
import InformationIcon from 'react-icons/lib/io/informatcircled';
import { UncontrolledTooltip } from 'reactstrap';

const StyledTR = styled.tr`
  cursor: pointer;
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
            <th>
              <FormattedMessage {...messages.columns.blockhash} />
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.txcount} />
              <InformationIcon color="gray" className="ml-1" id="blockListTransactionCount" />
              <UncontrolledTooltip placement="right-end" target="blockListTransactionCount">
                <FormattedMessage {...messages.columns.txtooltip} />
              </UncontrolledTooltip>
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.usdcount} />
            </th>
            <th className="text-right">
              <FormattedMessage {...messages.columns.timestamp} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.blocks.map((block, idx) =>
            (
              <StyledTR
                key={getItemKey(block, idx)}
                onClick={() => this.props.changeRoute(`/block/${block.block}`)}
              >
                <td>{block.block}</td>
                <td><ColoredHash hash={block.block_hash} /></td>
                <td className="text-right">{block.omni_tx_count}</td>
                <td className="text-right">{block.value.total_usd}</td>
                <td className="text-right"><FormattedUnixDateTime datetime={block.timestamp} /></td>
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
