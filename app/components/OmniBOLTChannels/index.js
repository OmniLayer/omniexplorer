/**
 *
 * OmniBOLT Channels
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
import { loadChannels } from './actions';
import makeSelectOmniBOLTChannels from './selectors';
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

export function OmniBOLTChannels(props) {
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

  if (props.channels.isFetching || !props.channels.lastFetched) {
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
          <FormattedMessage {...messages.columns.channelid} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.propertyid} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.balancea} />
        </th>
        <th className="text-center">
          <FormattedMessage {...messages.columns.balanceb} />
        </th>
      </tr>
      </thead>
      <tbody>
      {props.channels.data.map((channel, idx) => (
        <StyledTR key={getItemKey(idx)}>
          <td className="text-center">{channel.channel_id}</td>
          <td className="text-center">{channel.property_id}</td>
          <td className="text-center">{channel.amount_a}</td>
          <td className="text-center">{channel.amount_b}</td>
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

OmniBOLTChannels.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadChannels: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channels: makeSelectOmniBOLTChannels(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadChannels: () => dispatch(loadChannels()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLTChannels);
