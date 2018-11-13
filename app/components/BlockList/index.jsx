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

const StyledTr = styled.tr`
  cursor: pointer;
`;
class BlockList extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const getItemKey = (item, idx) => item.timestamp.toString().concat(idx);
    return (
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage {...messages.columns.block} />
            </th>
            <th>
              <FormattedMessage {...messages.columns.blockhash} />
            </th>
            <th>
              <FormattedMessage {...messages.columns.txcount} />
            </th>
            <th>
              <FormattedMessage {...messages.columns.timestamp} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.blocks.map((block, idx) =>
            (
              <StyledTr
                key={getItemKey(block, idx)}
                onClick={() => this.props.changeRoute(`/block/${block.block}`)}
              >
                <td>{block.block}</td>
                <td>{block.block_hash}</td>
                <td>{block.omni_tx_count}</td>
                <td><FormattedUnixDateTime datetime={block.timestamp} useSeconds /></td>
              </StyledTr>
            ))}
        </tbody>
      </Table>
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
