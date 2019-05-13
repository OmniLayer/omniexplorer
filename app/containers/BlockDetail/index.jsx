/**
 *
 * BlockDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ListHeader from 'components/ListHeader';
import Transaction from 'components/Transaction';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import NoOmniBlockTransactions from 'components/NoOmniBlockTransactions';
import ContainerBase from 'components/ContainerBase';
import JumpToBlock from 'components/JumpToBlock';
import { FIRST_BLOCK } from 'containers/App/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import isEmpty from 'lodash/isEmpty';

import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import FooterLinks from 'components/FooterLinks';
import ColoredHash from 'components/ColoredHash';
import BlockPagination from 'components/BlockPagination';
import makeSelectBlockDetail from './selectors';
import reducer from './reducer';
import { loadBlock } from './actions';
import sagaBlock from './saga';
import messages from './messages';
import {
  ALL_BLOCK_TRANSACTIONS,
  VALID_BLOCK_TRANSACTIONS,
  INVALID_BLOCK_TRANSACTIONS,
} from './constants';

import './blockdetail.scss';

const StyledContainer = styled(ContainerBase).attrs({
  className: 'blockdetail-container',
})`
  overflow: auto;

  .wrapper-tx-timestamp,
  .wrapper-btn-block:not(.tx-invalid) {
    display: none;
  }
`;

export class BlockDetail extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.block = props.match.params.block;
    this.state = {
      showTxType: ALL_BLOCK_TRANSACTIONS,
    };
    this.transactions = null;

    this.onShowInvalidTxs = this.onShowInvalidTxs.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
  }

  getTransactions() {
    console.log('call getTransactions');
    const { block } = this.props.blockdetail;

    if (!this.transactions) {
      this.transactions = {
        [ALL_BLOCK_TRANSACTIONS]: block.transactions,
        [VALID_BLOCK_TRANSACTIONS]: block.transactions.filter(x => x.valid),
        [INVALID_BLOCK_TRANSACTIONS]: block.transactions.filter(x => !x.valid),
      };
    }

    const txs = this.transactions[this.state.showTxType];
    return txs;
  }

  onShowInvalidTxs(showTxType) {
    this.setState({ showTxType });
  }

  componentDidMount() {
    console.log('block detail did mount');
    this.props.loadBlock(this.block);
  }

  render() {
    console.log('block detail render');

    const statusLoading = (!this.props || !this.props.status || !this.props.status.last_block);
    if (this.props.blockdetail.loading || statusLoading) {
      return (
        <Container>
          <LoadingIndicator/>
        </Container>
      );
    }

    const { last_block: lastBlock } = this.props.status;
    const { block } = this.props.blockdetail;
    const { confirmations } = (block.transactions || []).find(
      tx => tx.valid,
    ) || { confirmations: 'invalid' };

    let content;
    let txs = [];
    let hasInvalid = false;

    const getItemKey = (blockItem, idx) => blockItem.blockhash.slice(0, 22).concat(idx);
    const hashLink = txid => `/tx/${txid}`;

    if (this.block < FIRST_BLOCK || !block.transactions) {
      const errMsg = `Block ${this.block} not found`;
      content = (
        <NoOmniBlockTransactions
          header={errMsg}
          mainText={block.error}
          useDefaults={false}
        />
      );
    } else if (!block.transactions.length) {
      content = (
        <h3 className="text-center" style={{ margin: '3rem' }}>
          <FormattedMessage
            {...messages.doesNotHaveTransactions.body}
            values={{
              blockNumber: this.block,
            }}
          />
        </h3>
      );
    } else {
      txs = this.getTransactions();
      hasInvalid = !isEmpty(this.transactions[INVALID_BLOCK_TRANSACTIONS]);

      content = (
        <List
          {...block}
          items={txs}
          inner={Transaction}
          getItemKey={getItemKey}
          hashLink={hashLink}
        />
      );
    }
    const footer = <FooterLinks unconfirmed blocklist/>;
    const dropdownToggle = ()=>{
      switch (this.state.showTxType) {
        case ALL_BLOCK_TRANSACTIONS:
          return 'All Transactions';
        case VALID_BLOCK_TRANSACTIONS:
          return 'Valid Transactions';
        case INVALID_BLOCK_TRANSACTIONS:
          return 'Invalid Transactions';
        default:
          return 'Transactions';
      }
    }
    // const pluralize = hasInvalid > 1 ? 's' : '';
    const dropdown = <UncontrolledDropdown className="float-md-right">
      <DropdownToggle caret>
        {dropdownToggle()}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={() => this.onShowInvalidTxs(ALL_BLOCK_TRANSACTIONS)}>Show All</DropdownItem>
        <DropdownItem onClick={() => this.onShowInvalidTxs(VALID_BLOCK_TRANSACTIONS)}>Show Valid</DropdownItem>
        <DropdownItem onClick={() => this.onShowInvalidTxs(INVALID_BLOCK_TRANSACTIONS)}>Show Invalid</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>;

    const validInvalidTxs = hasInvalid ? dropdown : null;

    return (
      <StyledContainer fluid>
        <ListHeader
          message={
            block.transactions && block.transactions.length
              ? messages.header
              : messages.doesNotHaveTransactions.header
          }
          values={{
            br: <br/>,
            hash: <ColoredHash hash={block.blockhash}/>,
            blockNumber: this.block,
            txCount: block.transactions ? block.transactions.length : 0,
            confirmations,
            timestamp:
              block.transactions && block.transactions[0] ? (
                <FormattedUnixDateTime
                  datetime={block.transactions[0].blocktime}
                />
              ) : (
                '---'
              ),
          }}
        >
          <JumpToBlock
            onValidate={value =>
              FIRST_BLOCK < value && value <= lastBlock
            }
          />
          <br/>
          {validInvalidTxs}
        </ListHeader>
        <BlockPagination
          block={this.block}
          latest={lastBlock}
        />
        {content}
        {footer}
      </StyledContainer>
    );
  }
}

BlockDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadBlock: PropTypes.func,
  blockdetail: PropTypes.object.isRequired,
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blockdetail: makeSelectBlockDetail(),
  status: makeSelectStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadBlock: blockNum => dispatch(loadBlock(blockNum)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'blockDetail',
  reducer,
});

const withSagaBlock = injectSaga({
  key: 'blockDetail',
  saga: sagaBlock,
});

export default compose(
  withReducer,
  withSagaBlock,
  withConnect,
)(BlockDetail);
