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
import { Col, Container, Row } from 'reactstrap';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import ListHeader from 'components/ListHeader';
import Transaction from 'components/Transaction';

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

    const getItemKey = (block, idx) => block.blockhash.slice(0, 22).concat(idx);
    const hashLink = txid => `/tx/${txid}`;
    const { block } = this.props.blockdetail;
    return (
      <StyledContainer fluid>
        <ListHeader
          total={block.transactions.length}
          totalLabel=""
          messages={messages}
        />
        <List
          {...block}
          items={block.transactions}
          inner={Transaction}
          getItemKey={getItemKey}
          hashLink={hashLink}
        />
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

const withReducer = injectReducer({ key: 'blockDetail', reducer });

const withSagaBlock = injectSaga({ key: 'blockDetail', saga: sagaBlock });

export default compose(
  withReducer,
  withSagaBlock,
  withConnect,
)(BlockDetail);
