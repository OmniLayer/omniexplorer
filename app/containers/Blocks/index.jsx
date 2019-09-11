/**
 *
 * Blocks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { Row, Col } from 'reactstrap';

import {
  makeSelectBlocks,
  makeSelectLoading,
  makeSelectPreviousBlock,
  makeSelectLatestBlock,
} from './selectors';
import { disableLoading, loadBlocks } from './actions';
import messages from './messages';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
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
    this.props.loadBlocks(this.block);
  }

  render() {
    let content;
    let pagination;

    if (this.props.loading && !this.props.previousBlock) {
      content = <LoadingIndicator />;
    } else {
      const { blocks } = this.props.blocks;
      const list =
        isEmpty(blocks) || this.block > blocks[0].block + 9 ? (
          <NoOmniBlocks />
        ) : (
          <BlockList blocks={blocks} />
        );

      content = <div>{list}</div>;

      const pathname =
        this.props.location.pathname.toLowerCase().indexOf('block') > -1
          ? '/blocks/'
          : '/';
      const hashLink = blockNum => `${pathname}${blockNum}`;
      const previousBlockSet = () => {
        let result;
        const previous = this.block - 10;
        if (isEmpty(blocks)) {
          result = previous > FIRST_BLOCK ? previous : FIRST_BLOCK;
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

      const LinkPrevious = styled(A)``;
      const LinkNext = (isEmpty(blocks) || this.props.latest > blocks[0].block)
        ? styled(A)``
        : styled(A)`
          pointer-events: none;
          text-decoration: none;
          opacity: 0.5;
          cursor: not-allowed;
        `;

      pagination = (
        <Row>
          <Col sm={{size:2,offset:1}}>
            <h3>
              <LinkPrevious href={hashLink(previousBlockSet())}>&lt;&lt; Older</LinkPrevious>
            </h3>
          </Col>
          <Col sm={{size:2, offset:6}} className="text-right">
            <h3>
              <LinkNext href={hashLink(nextBlockSet())}>Newer &gt;&gt;</LinkNext>
            </h3>
          </Col>
        </Row>
      );
    }
    const footer = this.props.footer || <div />;

    return (
      <StyledContainer fluid>
        <ListHeader message={messages.header}>
          <JumpToBlock onValidate={(value) => (FIRST_BLOCK < value && value <= this.props.latest)}/>
        </ListHeader>
        {content}
        {this.props.withPagination && pagination}
        {footer}
      </StyledContainer>
    );
  }
}

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func,
  disableLoading: PropTypes.func,
  changeRoute: PropTypes.func,
  loading: PropTypes.bool,
  previousBlock: PropTypes.any,
  latest: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
  withPagination: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  loading: makeSelectLoading(),
  previousBlock: makeSelectPreviousBlock(),
  latest: makeSelectLatestBlock(),
  location: state => state.get('route').get('location'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadBlocks: block => dispatch(loadBlocks(block)),
    disableLoading: () => dispatch(disableLoading()),
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
