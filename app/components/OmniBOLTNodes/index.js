/**
 *
 * OmniBOLT Nodes
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';
import TableList from 'components/TableList';

import OmniBOLTNodesHeader from 'components/OmniBOLTNodesHeader';
import OmniBOLTNodeRecord from 'components/OmniBOLTNodeRecord';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';

import { loadNodes, setPage } from './actions';
import makeSelectOmniBOLTNodes from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function OmniBOLTNodes(props) {
  // const entity = props.match.params.entity || 'nodes';
  // const pageParam = props.match.params.page || props.pageNum || 1;
  const maxPagesByMedia = getMaxPagesByMedia();

  // props.onSetPage(pageParam);

  const handlePageClick = page => {
    props.onSetPage(page);
    // history.push(hashLink(page));
    props.loadNodes();
  };

  useInjectReducer({
    key: 'omniboltnodes',
    reducer,
  });

  useInjectSaga({
    key: 'omniboltnodes',
    saga,
  });

  useEffect(() => {
    props.loadNodes();
  }, []);

  const loading = (
    <ContainerBase>
      <LoadingIndicator />
    </ContainerBase>
  );

  if (props.nodes.isFetching || !props.nodes.lastFetched) {
    return loading;
  }

  const getItemKey = (item, idx) =>
    new Date().getTime()
      .toString()
      .concat(idx);

  const pathname = `${getSufixURL}`;
  const hashLink = v => `${pathname}/${v}`;

  const listProps = {
    ...props.nodes,
    header: OmniBOLTNodesHeader,
    items: props.nodes.data,
    inner: OmniBOLTNodeRecord,
    onSetPage: handlePageClick,
    hashLink,
    getItemKey,
  };

  return (
    <ContainerBase>
      <ListHeader message={messages.header} />
      <TableList {...listProps} usePagination />
    </ContainerBase>
  );
}

OmniBOLTNodes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadNodes: PropTypes.func.isRequired,
  onSetPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectOmniBOLTNodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadNodes: () => dispatch(loadNodes()),
    onSetPage: p => dispatch(setPage({ pageNum: p })),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTNodes);
