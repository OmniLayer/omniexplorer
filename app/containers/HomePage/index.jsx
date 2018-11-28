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
import styled from 'styled-components';

import { Col, Row } from 'reactstrap';

import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Blocks from 'containers/Blocks';
import { Link } from 'react-router-dom';

const Layout = styled.div`
  background-color: #f5f5f5;
  padding: 0;
`;

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const ViewFullBlockList = styled(Row)`
      background-color: black;
      color: white;

      letter-spacing: 0.1rem;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 14px;

      a {
        color: white;
      }
    `;

    const viewFullList = (
      <ViewFullBlockList>
        <Col sm>
          <Link
            to={{
              pathname: `/blocks`,
              state: { state: this.props },
            }}
            onClick={() => this.props.changeRoute(`/blocks`)}
          >
            View full block list...
          </Link>
        </Col>
      </ViewFullBlockList>
    );

    return (
      <Layout className="container-fluid">
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
            <Blocks footer={viewFullList} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default HomePage;
