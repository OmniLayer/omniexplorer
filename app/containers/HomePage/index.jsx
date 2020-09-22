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
import { Col, Row } from 'reactstrap';

import ContainerBase from 'components/ContainerBase';
import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Blocks from 'containers/Blocks';
import FooterLinks from 'components/FooterLinks';

export function HomePage() {
  const footer = <FooterLinks unconfirmed blocklist />;
  return (
    <ContainerBase>
      <Row noGutters>
        <Col sm>
          <HeaderMessage />
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <ServiceBlock />
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <TransactionHistory />
        </Col>
      </Row>
      <Row noGutters>
        <Col sm>
          <Blocks footer={footer} />
        </Col>
      </Row>
    </ContainerBase>
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
