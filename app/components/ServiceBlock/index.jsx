/**
 *
 * ServiceBlock
 *
 */

import React from 'react';
import styled from 'styled-components';

import agorasLogoPNG from 'images/agoras-logo.png';

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
  background-color: black;
`;

const NameLogo = () => (
  <ContainerLogo className="d-flex px-3 py-2">
    <div className="d-inline-block">
      <IMG src={agorasLogoPNG} alt="agoras logo" className="card-img-top" />
    </div>
    <div className="d-inline-block bg-inverse text-white text-nowrap">
      <h5>IDNI Agoras</h5>
      <span className="text-muted">Featured Token</span>
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

const ContainerSummaryItem1 = styled.div`
  background-color: #348FE2;
  padding: 6px;
  margin: 0 6px;
  font-size: 0.9rem
`;

const ContainerSummaryItem2 = styled.div`
  background-color: #159E9C;
  padding: 6px;
  margin: 6px;
  font-size: 0.9rem
`;

const ContainerSummaryItem3 = styled.div`
  background-color: #727CB6;
  padding: 6px;
  margin: 0 6px;
  font-size: 0.9rem
`;

const SummaryItem1 = () => (<ContainerSummaryItem1 className="text-white"><span className="d-block lead" style={{ fontSize: '0.9rem' }}>TODAY'S OMNI PRICE</span><span className="lead">0.008234</span></ContainerSummaryItem1>);
const SummaryItem2 = () => (<ContainerSummaryItem2 className="text-white"><span className="d-block lead" style={{ fontSize: '0.9rem' }}>TODAY'S TRANSACTIONS</span><span className="lead">8975</span></ContainerSummaryItem2>);
const SummaryItem3 = () => (<ContainerSummaryItem3 className="text-white"><span className="d-block lead" style={{ fontSize: '0.9rem' }}>OMNI PROPERTIES</span><span className="lead">342 <small>(+377 test)</small></span></ContainerSummaryItem3>);

const Summary = () => (
  <div>
    <SummaryItem1 />
    <SummaryItem2 />
    <SummaryItem3 />
  </div>
);

class ServiceBlock extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container className="d-flex">
        <div className="d-inline-block">
          <NameLogo />
          <BlockInfo />
        </div>
        <div className="d-inline-block w-100">
          <SummaryItem1 />
          <SummaryItem2 />
          <SummaryItem3 />
        </div>
      </Container>
    );
  }
}

ServiceBlock.propTypes = {};

export default ServiceBlock;
