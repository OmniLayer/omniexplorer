/**
 *
 * ServiceBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import { makeSelectStatus } from './selectors';
import featureLogoPNG from 'images/token1.png';

const IMG = styled.img`
  margin-right: 6px;
  width: 60px;
  height: 60px;
`;

const Container = styled.div`
  background-color: #3498DB;
  padding: 15px;
 
`;

const ContainerLogo = styled.div`
  background-color: #3498db;
`;

const NameLogo = () => (
  <ContainerLogo className="d-flex px-3 py-2">
    <div className="d-inline-block">
      <IMG src={featureLogoPNG} alt="feature logo" className="card-img-top" />
    </div>
    <div className="d-inline-block bg-inverse text-white text-nowrap">
      <h5>Omni</h5>
      <span>Featured Token</span>
    </div>
  </ContainerLogo>
);

const BlockInfo = () => (
  <div className="pt-3 pl-3">
    <div style={{ color: '#C4E0F3' }}>
      <span>LAST BLOCK</span>
    </div>
    <div className="text-white">
      <span>4971644 <small>(14.4s)</small></span>
    </div>
  </div>
);

const StyledContainerSummary = styled.div`
  padding: 6px;
  margin: 0 6px;
  font-size: 0.9rem
`;

const StyledContainerSummary1 = styled(StyledContainerSummary)`
  background-color: #348FE2;
`;
const StyledContainerSummary2 = styled(StyledContainerSummary)`
  background-color: #159E9C;
`;
const StyledContainerSummary3 = styled(StyledContainerSummary)`
  background-color: #727CB6;
`;

const SummaryItem = (props) => {
  const StyledContainer = props.container;

  return (
    <StyledContainer className="text-white">
      <span className="d-block lead" style={{ fontSize: '0.9rem' }}>{props.options.title}</span>
      <span className="lead">{props.options.value}</span>
    </StyledContainer>
  );
};

class ServiceBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const propertiesCountValue = (
      <span>
        { this.props.status.properties_count }
        <small>
          { ` (+${this.props.status.test_properties_count} test)` }
        </small>
      </span>
    );
    return (
      <Container className="d-flex">
        <div className="d-inline-block">
          <NameLogo />
          <BlockInfo />
        </div>
        <div className="d-inline-block w-100">
          <SummaryItem
            container={StyledContainerSummary1}
            options={{ title: 'TODAY\'S OMNI PRICE', value: this.props.status.omni_btc }}
          />
          <SummaryItem
            container={StyledContainerSummary2}
            options={{ title: 'TODAY\'S TRANSACTIONS', value: this.props.status.txcount_24hr }}
          />
          <SummaryItem
            container={StyledContainerSummary3}
            options={{ title: 'OMNI PROPERTIES', value: propertiesCountValue }}
          />
        </div>
      </Container>
    );
  }
}

ServiceBlock.propTypes = {
  getStatus: PropTypes.func,
  status: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(
  withConnect,
)(ServiceBlock);
