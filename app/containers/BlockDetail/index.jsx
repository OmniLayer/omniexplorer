/**
 *
 * BlockDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import styled from 'styled-components';
import { Container } from 'reactstrap';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ListHeader from 'components/ListHeader';
import Transaction from 'components/Transaction';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import NoOmniTransactions from 'components/NoOmniTransactions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectBlockDetail from './selectors';
import reducer from './reducer';
import { loadBlock } from './actions';
import sagaBlock from './saga';
import messages from './messages';

const StyledContainer = styled(Container)`
  background-color: #f0f3f4;
  overflow: auto;
  
  .wrapper-tx-timestamp {
    display: none;
  }
`;

export class BlockDetail extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.block = props.match.params.block;
  }

  componentDidMount() {
    console.log('block detail did mount');
    this.props.loadBlock(this.block);
  }

  render() {
    console.log('block detail render');
    if (this.props.blockdetail.loading) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }

    const { block } = this.props.blockdetail;
    let content;
    if (!block.transactions || !block.transactions.length) {
      content = <NoOmniTransactions />;
    } else {
      const getItemKey = (blockItem, idx) =>
        blockItem.blockhash.slice(0, 22).concat(idx);
      const hashLink = txid => `/tx/${txid}`;

      content = (
        <List
          {...block}
          items={block.transactions}
          inner={Transaction}
          getItemKey={getItemKey}
          hashLink={hashLink}
        />
      );
    }

    return (
      <StyledContainer fluid>
        <ListHeader
          totalLabel=""
          messages={messages}
          values={{
            blockNumber: this.block,
            txCount: block.transactions ? block.transactions.length : 0,
            timestamp:
              block.transactions && block.transactions[0] ? (
                <FormattedUnixDateTime
                  datetime={block.transactions[0].blocktime}
                />
              ) : (
                '---'
              ),
          }}
        />
        {content}
      </StyledContainer>
    );
  }
}

BlockDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadBlock: PropTypes.func,
  blockdetail: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  blockdetail: makeSelectBlockDetail(),
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
