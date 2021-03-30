/**
 *
 * OmniBOLT Channels
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

import OmniBOLTUsersHeader from 'components/OmniBOLTUsersHeader';
import OmniBOLTUserRecord from 'components/OmniBOLTUserRecord';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import history from 'utils/history';
import { getSufixURL } from 'utils/getLocationPath';

import { loadChannels } from './actions';
import makeSelectOmniBOLTChannels from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { setPage } from '../OmniBOLTNodes/actions';

export function OmniBOLTChannels(props) {
  // const entity = props.match.params.entity || 'nodes';
  // const pageParam = props.match.params.page || props.pageNum || 1;
  const maxPagesByMedia = getMaxPagesByMedia();

  // props.onSetPage(pageParam);

  const handlePageClick = page => {
    props.onSetPage(page);
    // history.push(hashLink(page));
    props.loadChannels();
  };

  useInjectReducer({
    key: 'omniboltchannels',
    reducer,
  });

  useInjectSaga({
    key: 'omniboltchannels',
    saga,
  });

  useEffect(() => {
    if (!props.channels.isFetching) {
      props.loadChannels();
    }
  }, []);

  const loading = (
    <ContainerBase>
      <LoadingIndicator />
    </ContainerBase>
  );

  if (props.channels.isFetching) {
    return loading;
  }

  const getItemKey = (item, idx) =>
    new Date().getTime()
      .toString()
      .concat(idx);

  const pathname = `${getSufixURL}`;
  const hashLink = v => `${pathname}/${v}`;

  const listProps = {
    ...props.channels,
    header: OmniBOLTUsersHeader,
    items: props.channels.data,
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

OmniBOLTChannels.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadChannels: PropTypes.func.isRequired,
  channels: PropTypes.any.isRequired,
  onSetPage: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channels: makeSelectOmniBOLTChannels(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadChannels: () => dispatch(loadChannels()),
    onSetPage: p => dispatch(setPage({ pageNum: p })),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTChannels);
