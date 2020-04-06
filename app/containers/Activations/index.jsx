/**
 *
 * Activations
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import StyledLink from 'components/StyledLink';
import ColoredHash from 'components/ColoredHash';
import WrapperTx from 'components/WrapperTx';

import { Container, Table } from 'reactstrap';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';

import ListHeader from 'components/ListHeader';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectActivations } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { loadActivations } from './actions';

const StyledContainer = styled(ContainerBase)`
  overflow: auto;
  padding-bottom: 0;
`;

const StyledTR = styled.tr`
  // cursor: pointer;
`;
const StyledTable = styled(Table)`
  th {
    font-weight: normal;
  }
`;

export function Activations(props) {
  useInjectReducer({
    key: 'activations',
    reducer,
  });

  useInjectSaga({
    key: 'activations',
    saga,
  });

  useEffect(() => {
    props.loadActivations();
  }, []);

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  if (props.activations.loading) {
    return loading;
  }

  const getItemKey = (activation, idx) =>
    activation.featureid
      .toString()
      .slice(0, 22)
      .concat(idx);

  const content = (
    <StyledTable responsive striped hover>
      <thead>
        <tr>
          <th className="text-center">
            <FormattedMessage {...messages.columns.id} />
          </th>
          <th className="text-left">
            <FormattedMessage {...messages.columns.name} />
          </th>
          <th className="text-center">
            <FormattedMessage {...messages.columns.block} />
          </th>
          <th className="text-center">
            <FormattedMessage {...messages.columns.minimumVersion} />
          </th>
          <th className="text-center">
            <FormattedMessage {...messages.columns.hash} />
          </th>
        </tr>
      </thead>
      <tbody>
        {props.activations.list.map((activation, idx) => (
          <StyledTR key={getItemKey(activation, idx)}>
            <td className="text-center">{activation.featureid}</td>
            <td className="text-left">
              {activation.featurename}
              {activation.pending && (
                <span className="text-warning">&nbsp;(Pending)</span>
              )}
            </td>
            <td className="text-center">{activation.activationblock}</td>
            <td className="text-center">{activation.minimumversion}</td>
            <td className="text-center">
              <WrapperTx>
                <StyledLink
                  to={{
                    pathname: `/tx/${activation.txhash}`,
                    state: { state: props.state },
                  }}
                >
                  <ColoredHash hash={activation.txhash} />
                </StyledLink>
              </WrapperTx>
            </td>
          </StyledTR>
        ))}
      </tbody>
    </StyledTable>
  );

  return (
    <StyledContainer fluid>
      <ListHeader message={messages.header} />
      {content}
    </StyledContainer>
  );
}

Activations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadActivations: PropTypes.func.isRequired,
  activations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  activations: makeSelectActivations(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadActivations: () => dispatch(loadActivations()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Activations);
