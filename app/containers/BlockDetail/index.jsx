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
import NoOmniBlockTransactions from 'components/NoOmniBlockTransactions';
import ContainerBase from 'components/ContainerBase';
import JumpToBlock from 'components/JumpToBlock';
import { FIRST_BLOCK } from 'containers/App/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectBlockDetail from './selectors';
import reducer from './reducer';
import { loadBlock } from './actions';
import sagaBlock from './saga';
import messages from './messages';
import { FormattedMessage } from 'react-intl';

const StyledContainer = styled(ContainerBase)`
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
    const { confirmations } = (block.transactions || []).find(tx => tx.valid) || { confirmations: 'invalid' };

    let content;
    if (this.block < FIRST_BLOCK || !block.transactions) {
      content = <NoOmniBlockTransactions mainText={block.error} useDefaults={false} />;
    } else if (!block.transactions.length) {
      content = (
        <h3 className="text-center" style={{ margin: '3rem' }}>
          <FormattedMessage {...messages.doesNotHaveTransactions} />
        </h3>
      );
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
          message={messages.header}
          values={{
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
          <JumpToBlock />
        </ListHeader>
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
