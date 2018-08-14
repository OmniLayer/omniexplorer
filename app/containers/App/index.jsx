/* eslint-disable no-restricted-globals */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import TransactionDetail from 'containers/TransactionDetail';
import AddressDetail from 'containers/AddressDetail';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Search from 'containers/Search/Loadable';
import Properties from 'containers/Properties/Loadable';
import AssetDetail from 'containers/AssetDetail/Loadable';
import CrowdsaleDetail from 'containers/CrowdsaleDetail/Loadable';
import Promote from 'containers/Promote/Loadable';
import Feedback from 'containers/Feedback/Loadable';
import Crowdsales from 'containers/Crowdsales';
import HistoryChart from 'containers/HistoryChart';
import Footer from 'components/Footer';
import Header from 'components/Header';

import DevTools from 'utils/devTools';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { LOAD_STATUS } from 'components/ServiceBlock/constants';
import Sagas from './sagas';

// Import DevTools, only for dev environment
const isDev = process.env.NODE_ENV !== 'production';

// Set Moment Global locale
Moment.globalLocale = 'en-gb';

const AppWrapper = styled.div`
  max-width: calc(1170px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends React.Component {
  componentDidMount() {
    this.props.loadStatus();
  }

  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - Omni Explorer" defaultTitle="Omni Explorer">
          <meta name="description" content="Omni Explorer" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/:page(\d+)?" component={HomePage} />
          <Route path="/tx/:tx" component={TransactionDetail} />
          <Route
            path="/address/:address/:page(\d+)?"
            component={AddressDetail}
            key={location.pathname}
          />
          <Route
            path="/search/:query"
            component={Search}
            key={location.pathname}
          />
          <Route
            path="/properties/:query"
            component={Properties}
            key={location.pathname}
          />
          <Route
            path="/asset/:propertyid(\d+)"
            component={AssetDetail}
            key={location.pathname}
          />
          <Route exact path="/crowdsales/:ecosystem" component={Crowdsales} />
          <Route
            path="/crowdsale/:crowdsaleid(\d+)"
            component={CrowdsaleDetail}
            key={location.pathname}
          />
          <Route exact path="/promote" component={Promote} />
          <Route exact path="/submitfeedback" component={Feedback} />
          <Route exact path="/history" component={HistoryChart} />
          <Route path="" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
        {isDev ? <DevTools /> : <div />}
      </AppWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadStatus: () => dispatch({ type: LOAD_STATUS }),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  ...Sagas,
)(App);
