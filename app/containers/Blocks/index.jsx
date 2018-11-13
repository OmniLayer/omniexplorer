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
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import styled from 'styled-components';
import ListHeader from 'components/ListHeader';
import BlockList from 'components/BlockList';
import LoadingIndicator from 'components/LoadingIndicator';

import injectSaga from 'utils/injectSaga';
import sagaBlocks from 'containers/Blocks/saga';

import { makeSelectBlocks, makeSelectLoading } from './selectors';
import { loadBlocks, setBlockPage } from './actions';
import messages from './messages';

const StyledPagination = styled(Pagination).attrs({
  className: 'pagination justify-content-end',
})`
  ul.pagination {
    margin-bottom: 0;
  }
`;

const StyledPaginationLink = styled(PaginationLink)`
  border-radius: 3.2px;
`;
const StyledPaginationButton = styled(PaginationItem)`
  margin: 0 2px;

  &.disabled {
    cursor: not-allowed;
  }
`;

export class Blocks extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { block } = props.match.params;
    this.props.onSetBlockPage(block);
  }

  componentDidMount() {
    this.props.loadBlocks();
    console.log('Blocks did mount');
  }

  render() {
    const StyledContainer = styled(Container)`
      background-color: #f0f3f4;
      overflow: auto;
    `;
    const StyledH3 = styled.h3`
      padding: 3rem 0;
    `;

    let content;
    let pagination = <div />;
    const hasBlocks = () => (this.props.blocks.blocks || []).length === 0;
    if (this.props.loading) {
      content = <LoadingIndicator />;
    } else if (hasBlocks()) {
      content = (
        <StyledH3 className="lead text-center">
          <p className="h3">No Omni Protocol blocks found</p>
          <p className="h5">
            If the block you are searching for was just broadcast it might take
            a few minutes for the network to pass it around for us to see it.
          </p>
          <p className="h5">
            If the block you are searching for is a Bitcoin only block you
            should use a bitcoin block explorer like{' '}
            <a href="https://www.blocktrail.com">blocktrail.com</a>
          </p>
        </StyledH3>
      );
    } else {
      const { blocks } = this.props.blocks;
      content = (
        <BlockList blocks={blocks} onSetBlockPage={this.props.onSetBlockPage} />
      );

      const hashLink = blockNum => `/${blockNum}`;
      pagination = (
        <StyledPagination>
          <StyledPaginationButton className="mb-0">
            <StyledPaginationLink
              previous
              href={hashLink(blocks[blocks.length - 1].block + 10)}
            />
          </StyledPaginationButton>
          <StyledPaginationButton className="mb-0">
            <StyledPaginationLink
              next
              href={hashLink(blocks[0].block - 1)} />
          </StyledPaginationButton>
        </StyledPagination>
      );
    }

    return (
      <StyledContainer fluid>
        <ListHeader totalLabel="Blocks" messages={messages}>
          {pagination}
        </ListHeader>
        {content}
      </StyledContainer>
    );
  }
}

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func,
  onSetBlockPage: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  loading: makeSelectLoading(),
  location: state => state.get('route').get('location'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadBlocks: addr => dispatch(loadBlocks(addr)),
    onSetBlockPage: p => dispatch(setBlockPage(p)),
    changeRoute: (url) => dispatch(routeActions.push(url)),
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
