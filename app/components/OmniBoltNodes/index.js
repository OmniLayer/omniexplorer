/**
 *
 * OmniBOLT Nodes
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
import { loadNodes } from './actions';
import makeSelectOmniBOLTNodes from './selectors';
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

export function OmniBOLTNodes(props) {
  useInjectReducer({
    key: 'omniboltnodes',
    reducer,
  });

  useInjectSaga({
    key: 'omniboltnodes',
    saga,
  });

  useEffect(() => {
    debugger;
    props.loadNodes();
  }, []);

  const loading = (
    <ContainerBase>
      <LoadingIndicator />
    </ContainerBase>
  );

  if (props.nodes.isFetching) {
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
          <FormattedMessage {...messages.columns.id} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.p2paddress} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.loginip} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.logintime} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.offlinetime} />
        </th>
      </tr>
      </thead>
      <tbody>
      {props.nodes.data.map((node, idx) => (
        <StyledTR key={getItemKey(idx)}>
          <td className="text-center">{node.is_online}</td>
          <td className="text-center">{node.node_id}</td>
          <td className="text-center">{node.p2p_address}</td>
          <td className="text-center">{node.latest_login_ip}</td>
          <td className="text-center">{node.latest_login_at}</td>
          <td className="text-center">{node.latest_offline_at}</td>
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

OmniBOLTNodes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadNodes: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  nodes: makeSelectOmniBOLTNodes(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadNodes: () => dispatch(loadNodes()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTNodes);
