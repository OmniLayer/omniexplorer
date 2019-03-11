/**
 *
 * Activations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';

import ListHeader from 'components/ListHeader';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectActivations from './selectors';
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

export class Activations extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { completed: true };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  componentDidMount() {
    console.log('activation list did mount');
    this.props.loadActivations();
  }

  onRadioBtnClick(completed) {
    this.setState({ completed });
  }

  render() {
    const loading = (
      <Container>
        <LoadingIndicator />
      </Container>
    );

    if (this.props.activations.loading) {
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
            <th className="text-right">
              <FormattedMessage {...messages.columns.block} />
            </th>
            <th className="text-center">
              <FormattedMessage {...messages.columns.minimumVersion} />
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.activations.list.map((activation, idx) => (
            <StyledTR key={getItemKey(activation, idx)}>
              <td className="text-center">{activation.featureid}</td>
              <td className="text-left">{activation.featurename}</td>
              <td className="text-right">{activation.activationblock}</td>
              <td className="text-center">{activation.minimumversion}</td>
            </StyledTR>
          ))}
        </tbody>
      </StyledTable>
    );
    console.log('return activaction list render');
    return (
      <StyledContainer fluid>
        <ListHeader
          message={messages.header}
          extra={
            <ButtonGroup>
              <Button
                onClick={() => this.onRadioBtnClick(true)}
                active={!!this.state.completed}
              >
                Completed
              </Button>
              <Button
                onClick={() => this.onRadioBtnClick(false)}
                active={!this.state.completed}
              >
                Pending
              </Button>
            </ButtonGroup>
          }
        />
        {content}
      </StyledContainer>
    );
  }
}

Activations.propTypes = {
  dispatch: PropTypes.func.isRequired,
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

const withReducer = injectReducer({
  key: 'activations',
  reducer,
});
const withSaga = injectSaga({
  key: 'activations',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Activations);
