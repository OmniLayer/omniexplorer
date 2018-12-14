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
import NoOmniBlocks from 'components/NoOmniBlocks';
import ContainerBase from 'components/ContainerBase';

import isEmpty from 'lodash/isEmpty';
import injectSaga from 'utils/injectSaga';
import sagaBlocks from 'containers/Blocks/saga';
import { FIRST_BLOCK } from 'containers/App/constants';

import { makeSelectBlocks, makeSelectLoading, makeSelectPreviousBlock } from './selectors';
import { disableLoading, loadBlocks } from './actions';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
`;

const A = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export class Blocks extends React.Component {
  constructor(props) {
    super(props);

    const { block } = this.props.match.params || '';
    this.block = block;
  }

  componentDidMount() {
    if (this.block >= FIRST_BLOCK || isEmpty(this.block)) {
      this.props.loadBlocks(this.block);
    } else {
      this.props.disableLoading();
    }
  }

  render() {
    let content;
    let pagination;

    if (this.props.loading && !this.props.previousBlock) {
      content = <LoadingIndicator/>;
    } else {
      const { blocks } = this.props.blocks;
      const list =
        isEmpty(blocks) || this.block > blocks[0].block + 9 ? (
          <NoOmniBlocks/>
        ) : (
          <BlockList blocks={blocks}/>
        );

      content = <div>{list}</div>;

      const pathname =
        this.props.location.pathname.toLowerCase().indexOf('block') > -1
          ? '/blocks/'
          : '/';
      const hashLink = blockNum => `${pathname}${blockNum}`;
      const previousBlockSet = () => {
        let result;
        if (isEmpty(blocks)) {
          result = this.block - 10;
        } else if (this.block > blocks[0].block + 9) {
          result = blocks[0].block;
        } else {
          result = blocks[blocks.length - 1].block - 1;
        }
        return result;
      };

      const nextBlockSet = () => {
        let result;
        if (isEmpty(blocks) || this.block > blocks[0].block + 9) {
          result = (parseInt(this.block, 10) || FIRST_BLOCK) + 10;
        } else {
          result = blocks[0].block + 10;
        }
        return result;
      };

      pagination = (
        <h3 align="center">
          <A href={hashLink(previousBlockSet())}>&lt;&lt; Previous</A>
          &nbsp;<span className="d-none d-sm-inline">Blocks mined</span>&nbsp;
          <A href={hashLink(nextBlockSet())}>Next &gt;&gt;</A>
        </h3>
      );
    }

    const Footer = this.props.footer || <div/>;
    return (
      <StyledContainer fluid>
        <ListHeader message={messages.header}>
          <JumpToBlock/>
        </ListHeader>
        {this.props.withPagination && pagination}
        {content}
        {Footer}
      </StyledContainer>
    );
  }
}

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func,
  disableLoading: PropTypes.func,
  loading: PropTypes.bool,
  previousBlock: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
  withPagination: PropTypes.bool,
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
    disableLoading: () => dispatch(disableLoading()),
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
