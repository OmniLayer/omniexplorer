/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Col, Container, Row } from 'reactstrap';

import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';

const Layout = styled(Container)`
  background-color: #f5f5f5;
  padding: 0 !important;
`;

export function HomePage() {
  const footer = <FooterLinks unconfirmed blocklist />;
  return (
    <Layout fluid>
      <Row noGutters>
        <Col sm>
          <HeaderMessage />
        </Col>
      </Row>
      <Row>
        <Col sm="12" lg="5" className="text-center-down-md">
          <ServiceBlock />
        </Col>
        <Col sm="12" lg="7" className="">
          <TransactionHistory />
        </Col>
      </Row>
      <Row>
        <Col sm>
          <Blocks footer={footer} />
        </Col>
      </Row>
    </Layout>
  );
}

HomePage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(withConnect)(HomePage);
