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

import { Container, Col, Row } from 'reactstrap';

import ServiceBlock from 'components/ServiceBlock';
import HeaderMessage from 'components/HeaderMessage';
import TransactionHistory from 'components/TransactionHistory';
import Blocks from 'containers/Blocks';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import PropTypes from 'prop-types';

const Layout = styled(Container)`
  background-color: #f5f5f5;
  padding: 0;
`;

class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const ViewFullBlockList = styled(Row)`
      background-color: #7c8fa0;
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
              state: { state: this.props.state },
            }}
          >
            View full block list...
          </Link>
        </Col>
      </ViewFullBlockList>
    );

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
            <Blocks footer={viewFullList} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

// export default HomePage;
HomePage.propTypes = {
  changeRoute: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);
export default compose(withConnect)(HomePage);
