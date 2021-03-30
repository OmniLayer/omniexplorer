/**
 *
 * OmniBOLT Users
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';
import TableList from 'components/TableList';

import OmniBOLTUsersHeader from 'components/OmniBOLTUsersHeader';
import OmniBOLTUserRecord from 'components/OmniBOLTUserRecord';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';

import { loadUsers } from './actions';
import makeSelectOmniBOLTUsers from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { setPage } from '../OmniBOLTNodes/actions';

export function OmniBOLTUsers(props) {
  // const entity = props.match.params.entity || 'nodes';
  // const pageParam = props.match.params.page || props.pageNum || 1;
  const maxPagesByMedia = getMaxPagesByMedia();

  // props.onSetPage(pageParam);

  const handlePageClick = page => {
    props.onSetPage(page);
    // history.push(hashLink(page));
    props.loadUsers();
  };

  useInjectReducer({
    key: 'omniboltusers',
    reducer,
  });

  useInjectSaga({
    key: 'omniboltusers',
    saga,
  });

  useEffect(() => {
    props.loadUsers();
  }, []);

  const loading = (
    <ContainerBase>
      <LoadingIndicator />
    </ContainerBase>
  );

  if (props.users.isFetching) {
    return loading;
  }

  const getItemKey = (item, idx) =>
    new Date().getTime()
      .toString()
      .concat(idx);

  const pathname = `${getSufixURL}`;
  const hashLink = v => `${pathname}/${v}`;
  debugger;
  const listProps = {
    ...props.users,
    header: OmniBOLTUsersHeader,
    items: props.users.data,
    inner: OmniBOLTUserRecord,
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

OmniBOLTUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
  onSetPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectOmniBOLTUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(loadUsers()),
    onSetPage: p => dispatch(setPage({ pageNum: p })),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTUsers);
