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
import classnames from 'classnames';

import { FormattedDateTime } from 'components/FormattedDateTime';
import ColoredHash from 'components/ColoredHash';
import OnlineStatus from 'components/OnlineStatus';
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

  const formatP2PAddress = (addr) => addr.slice(0, addr.lastIndexOf('/') + 1);

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
          <td className="text-center">
            <OnlineStatus
              className={classnames({
                'text-success': node.is_online,
                'text-muted': !node.is_online,
              })}
              size={24} />
          </td>
          <td>
            <ColoredHash hash={node.node_id} />
          </td>
          <td className="text-left">
            <span>
              {formatP2PAddress(node.p2p_address)}
            </span>
            <span className="float-right">
              <ColoredHash hash={node.p2p_address} withoutPrefixSufix />
            </span>
          </td>
          <td className="text-center">{node.latest_login_ip}</td>
          <td className="text-center">
            <FormattedDateTime datetime={node.latest_login_at} useSeconds />
          </td>
          <td className="text-center">
            <FormattedDateTime datetime={node.latest_offline_at} useSeconds />
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
