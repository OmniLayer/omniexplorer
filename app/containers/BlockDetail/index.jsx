/**
 *
 * BlockDetail
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ListHeader from 'components/ListHeader';
import Transaction from 'components/Transaction';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import NoOmniBlockTransactions from 'components/NoOmniBlockTransactions';
import ContainerBase from 'components/ContainerBase';
import JumpToBlock from 'components/JumpToBlock';
import { FIRST_BLOCK } from 'containers/App/constants';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import isEmpty from 'lodash/isEmpty';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import { makeSelectStatus } from 'components/ServiceBlock/selectors';
import FooterLinks from 'components/FooterLinks';
import ColoredHash from 'components/ColoredHash';
import BlockPagination from 'components/BlockPagination';
import { makeSelectLocation } from 'containers/App/selectors';
import makeSelectBlockDetail from './selectors';
import reducer from './reducer';
import { loadBlock } from './actions';
import sagaBlock from './saga';
import messages from './messages';

import {
  ALL_BLOCK_TRANSACTIONS,
  INVALID_BLOCK_TRANSACTIONS,
  VALID_BLOCK_TRANSACTIONS,
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

export function BlockDetail(props) {
  const { block } = props.match.params;
  const [showTxType, setShowTxType] = useState(ALL_BLOCK_TRANSACTIONS);
  const [transactions, setTransactions] = useState({});
  const [currentData, setCurrentData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPagesByMedia = getMaxPagesByMedia();

  useInjectReducer({
    key: 'blockDetail',
    reducer,
  });

  useInjectSaga({
    key: 'blockDetail',
    saga: sagaBlock,
  });

  const getTransactions = (page= 1) => {
    console.log('call getTransactions');
    const { blockdetail } = props;

    if (isEmpty(transactions) && blockdetail.block.block === Number(block)) {
      setCurrentPage(parseInt(props.location.hash.replace('#', ''), 10) || page);
      setCurrentData(blockdetail.block.transactions.slice(0, maxPagesByMedia));
      setPageCount(Math.ceil(blockdetail.block.transactions.length / maxPagesByMedia));

      setTransactions({
        [ALL_BLOCK_TRANSACTIONS]: blockdetail.block.transactions,
        [VALID_BLOCK_TRANSACTIONS]: blockdetail.block.transactions.filter(
          x => x.valid,
        ),
        [INVALID_BLOCK_TRANSACTIONS]: blockdetail.block.transactions.filter(
          x => !x.valid,
        ),
      });
    }

    const txs = transactions[showTxType];
    return txs;
  };

  const onFilterByInvalidTxs = (showtxtype) => {
    setShowTxType(showtxtype);
    setCurrentPage(1);

    setCurrentData(transactions[showtxtype].slice(0, maxPagesByMedia));
  };

  useEffect(() => {
    props.loadBlock(block);
  }, [block]);

  const handlePageClick = page => {
    const txs = getTransactions();
    setCurrentPage(page);

    const currentTxs = txs.slice((page -1 )*maxPagesByMedia, (page-1) * maxPagesByMedia + maxPagesByMedia);
    setCurrentData(currentTxs);
  };

  const statusLoading = !props || !props.status || !props.status.last_block;

  if (props.blockdetail.loading || statusLoading) {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    );
  }

  const txs = getTransactions();
  const { last_block: lastBlock } = props.status;
  const { blockdetail } = props;
  const { confirmations } = (blockdetail.block.transactions || []).find(
    tx => tx.valid,
  ) || { confirmations: 'invalid' };

  let content;
  let hasInvalid = false;

  const getItemKey = (blockItem, idx) =>
    blockItem.blockhash.slice(0, 22).concat(idx);

  if (block < FIRST_BLOCK || !blockdetail.block.transactions) {
    const errMsg = `Block ${block} not found`;

    content = (
      <NoOmniBlockTransactions
        header={errMsg}
        mainText={blockdetail.error}
        useDefaults={false}
      />
    );
  } else if (!blockdetail.block.transactions.length) {
    content = (
      <h4 className="text-center" style={{ margin: '3rem' }}>
        <FormattedMessage
          {...messages.doesNotHaveTransactions.body}
          values={{
            blockNumber: block,
          }}
        />
      </h4>
    );
  } else {
    hasInvalid = !isEmpty(transactions[INVALID_BLOCK_TRANSACTIONS]);
    const hashLink = page => `#${page}`;
    content = (
      <div>
        <List
          {...block}
          usePagination
          pageCount={pageCount}
          currentPage={currentPage}
          onSetPage={handlePageClick}
          items={currentData}
          inner={Transaction}
          getItemKey={getItemKey}
          hashLink={hashLink}
        />
      </div>
    );
  }
  const footer = <FooterLinks unconfirmed blocklist />;
  const dropdownToggle = () => {
    switch (showTxType) {
      case ALL_BLOCK_TRANSACTIONS:
        return 'All Transactions';
      case VALID_BLOCK_TRANSACTIONS:
        return 'Valid Transactions';
      case INVALID_BLOCK_TRANSACTIONS:
        return 'Invalid Transactions';
      default:
        return 'Transactions';
    }
  };
  // const pluralize = hasInvalid > 1 ? 's' : '';
  const dropdown = (
    <UncontrolledDropdown className="float-md-right">
      <DropdownToggle caret>{dropdownToggle()}</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          onClick={() => onFilterByInvalidTxs(ALL_BLOCK_TRANSACTIONS)}
        >
          Show All
        </DropdownItem>
        <DropdownItem
          onClick={() => onFilterByInvalidTxs(VALID_BLOCK_TRANSACTIONS)}
        >
          Show Valid
        </DropdownItem>
        <DropdownItem
          onClick={() => onFilterByInvalidTxs(INVALID_BLOCK_TRANSACTIONS)}
        >
          Show Invalid
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const validInvalidTxs = hasInvalid ? dropdown : null;

  return (
    <StyledContainer fluid>
      <ListHeader
        message={
          blockdetail.block.transactions && blockdetail.block.transactions.length
            ? messages.header
            : messages.doesNotHaveTransactions.header
        }
        values={{
          br: <br />,
          hash: <ColoredHash hash={blockdetail.block.blockhash} />,
          blockNumber: block,
          txCount: blockdetail.block.transactions
            ? blockdetail.block.transactions.length
            : 0,
          pageCount: pageCount,
          confirmations,
          timestamp:
            blockdetail.block.transactions && blockdetail.block.transactions[0] ? (
              <FormattedUnixDateTime
                datetime={blockdetail.block.transactions[0].blocktime}
              />
            ) : (
              '---'
            ),
        }}
      >
        <JumpToBlock
          onValidate={value => FIRST_BLOCK < value && value <= lastBlock}
        />
        <br />
        {validInvalidTxs}
      </ListHeader>
      <BlockPagination block={block} latest={lastBlock} />
      {content}
      <BlockPagination block={block} latest={lastBlock} />
      {footer}
    </StyledContainer>
  );
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
  location: makeSelectLocation(),
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

export default compose(
  withConnect,
)(BlockDetail);
