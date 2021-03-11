/**
 *
 * OmniBOLT Users
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Table } from 'reactstrap';

import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import ListHeader from 'components/ListHeader';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadUsers } from './actions';
import makeSelectOmniBOLTUsers from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const StyledTR = styled.tr`
  // cursor: pointer;
`;
const StyledTable = styled(Table)`
  th {
    font-weight: normal;
  }
`;

export function OmniBOLTUsers(props) {
  useInjectReducer({
    key: 'omniboltusers',
    reducer,
  });

  useInjectSaga({
    key: 'omniboltusers',
    saga,
  });

  useEffect(() => {
    debugger;
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

  const getItemKey = (idx) =>
    new Date().getTime()
      .toString()
      .concat(idx);

  const content = (
    <StyledTable responsive striped hover>
      <thead>
      <tr>
        <th className="text-left">
          <FormattedMessage {...messages.columns.online} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.userid} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.obdnodeid} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.obdp2pnodeid} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.offlinetime} />
        </th>
      </tr>
      </thead>
      <tbody>
      {props.users.data.map((user, idx) => (

        <StyledTR key={getItemKey(idx)}>
          <td className="text-center">{user.is_online}</td>
          <td className="text-center">{user.user_id}</td>
          <td className="text-center">{user.obd_node_id}</td>
          <td className="text-center">{user.obd_p2p_node_id}</td>
          <td className="text-center">{user.offline_at}</td>
          {/*<td className="text-left">*/}
          {/*  {node.featurename}*/}
          {/*  {node.pending && (*/}
          {/*    <span className="text-warning">&nbsp;(Pending)</span>*/}
          {/*  )}*/}
          {/*</td>*/}
          {/*<td className="text-center">{node.nodeblock}</td>*/}
          {/*<td className="text-center">{node.minimumversion}</td>*/}
          <td className="text-center">
            <WrapperTx>
              {/*<StyledLink*/}
              {/*  to={{*/}
              {/*    pathname: `${getSufixURL()}/tx/${node.txhash}`,*/}
              {/*    state: { state: props.state },*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <ColoredHash hash={node.txhash} />*/}
              {/*</StyledLink>*/}
            </WrapperTx>
          </td>
        </StyledTR>
      ))}
      </tbody>
    </StyledTable>
  );

  return (
    <ContainerBase>
      <ListHeader message={messages.header} />
      {content}
    </ContainerBase>
  );
}

OmniBOLTUsers.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectOmniBOLTUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadUsers: () => dispatch(loadUsers()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTUsers);
