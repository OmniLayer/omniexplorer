/**
 *
 * Blocks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import ListHeader from 'components/ListHeader';
import BlockList from 'components/BlockList';
import LoadingIndicator from 'components/LoadingIndicator';
import JumpToBlock from 'components/JumpToBlock';
import ContainerBase from 'components/ContainerBase';

import injectSaga from 'utils/injectSaga';
import sagaBlocks from 'containers/Blocks/saga';

import { makeSelectBlocks, makeSelectLoading, makeSelectPreviousBlock } from './selectors';
import { loadBlocks } from './actions';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
`;
const StyledH3 = styled.h3`
  padding: 3rem 0;
`;

export class Blocks extends React.Component {
  constructor(props) {
    super(props);
    const { block } = this.props.match.params || '';
    this.block = block;
  }

  componentDidMount() {
    this.props.loadBlocks(this.block);
    console.log('Blocks did mount');
  }

  render() {
    let content;
    let pagination;

    const hasBlocks = () => (this.props.blocks.blocks || []).length === 0;
    const notfoundblocks = (
      <StyledH3 className="lead text-center">
        <p className="h3">No Omni Protocol blocks found</p>
        <p className="h5">
          If the block you are searching for was just broadcast it might take a
          few minutes for the network to pass it around for us to see it.
        </p>
        <p className="h5">
          If the block you are searching for is a Bitcoin only block you should
          use a bitcoin block explorer like{' '}
          <a href="https://www.blocktrail.com">blocktrail.com</a>
        </p>
      </StyledH3>
    );
    if (this.props.loading && !this.props.previousBlock) {
      content = <LoadingIndicator/>;
    } else if (hasBlocks()) {
      content = notfoundblocks;
    } else {
      const { blocks } = this.props.blocks;

      const list =
        (this.block > blocks[0].block + 9)
          ? notfoundblocks
          : (<BlockList blocks={blocks}/>);

      content = (
        <div>
          {list}
          {this.props.previousBlock &&
          this.props.loading && <LoadingIndicator/>}
        </div>
      );

      let pathname = this.props.location.pathname.toLowerCase().indexOf('block') > -1 ? '/blocks/' : '/';
      const hashLink = blockNum => `${pathname}${blockNum}`;
      const A = styled.a`
        text-decoration: none;
        &:hover {
          text-decoration: none;
        }
      `;
      const previousBlockSet =
        (this.block > blocks[0].block + 9)
          ? blocks[0].block
          : blocks[blocks.length - 1].block - 1;

      pagination = (
        <h3 align="center">
          <A href={hashLink(previousBlockSet)}>&lt;&lt; Previous</A>
          &nbsp;<span className="d-none d-sm-inline">Blocks mined</span>&nbsp;
          <A href={hashLink(blocks[0].block + 10)}>Next &gt;&gt;</A>
        </h3>
      );
    }

    const Footer = this.props.footer || <div/>;
    return (
      <StyledContainer fluid>
        <ListHeader message={messages.header}>
          <JumpToBlock/>
        </ListHeader>
        {this.props.withPagination &&
          pagination
        }
        {content}
        {Footer}
      </StyledContainer>
    );
  }
}

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func,
  loading: PropTypes.bool,
  previousBlock: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  loading: makeSelectLoading(),
  previousBlock: makeSelectPreviousBlock(),
  location: state => state.get('route').get('location'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadBlocks: block => dispatch(loadBlocks(block)),
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSagaBlock = injectSaga({
  key: 'blocks',
  saga: sagaBlocks,
});

export default compose(
  withConnect,
  withSagaBlock,
  withRouter,
)(Blocks);
