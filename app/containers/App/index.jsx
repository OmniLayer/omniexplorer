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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import TransactionDetail from 'containers/TransactionDetail';
import Transactions from 'containers/Transactions';
import AddressDetail from 'containers/AddressDetail';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Search from 'containers/Search/Loadable';
import Properties from 'containers/Properties/Loadable';
import AssetDetail from 'containers/AssetDetail/Loadable';
import CrowdsaleDetail from 'containers/CrowdsaleDetail/Loadable';
import Feedback from 'containers/Feedback/Loadable';
import Crowdsales from 'containers/Crowdsales';
import BlockDetail from 'containers/BlockDetail';
// import HistoryChart from 'containers/HistoryChart';
import FullBlockList from 'containers/FullBlockList';
import Activations from 'containers/Activations';
import Exchange from 'containers/Exchange';

import Footer from 'components/Footer';
import Header from 'components/Header';
import ErrorBoundary from 'components/ErrorBoundary';

import DevTools from 'utils/devTools';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { startFetch } from 'components/ServiceBlock/actions';

import { useInjectSaga } from 'utils/injectSaga';
import tokenSaga from 'components/Token/saga';
import activationsSaga from 'containers/Activations/saga';
import statusSaga from 'components/ServiceBlock/saga';
import TestnetMarquee from 'components/TestnetMarquee';
import isTestnet from 'utils/isTestnet';
import { getLongName, getSiteDescriptor } from 'utils/getBlockchainName';
import GlobalStyle from '../../global-styles';

import { TXS_CLASS_AB } from './constants';

// Set Moment Global locale
// Moment.globalLocale = 'en-gb';
// import Moment from 'react-moment';

// Import DevTools, only for dev environment
const isDev = process.env.NODE_ENV !== 'production';

const AppWrapper = styled.div.attrs({
  className: 'd-flex flex-column min-vh-100',
})`
  //max-width: calc(1170px + 16px * 2);
  margin: 0 auto;

  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export function App({ loadStatus }) {
  // eslint-disable-next-line no-unused-vars
  const [theme, setTheme] = useState('light');

  useInjectSaga({
    key: 'tokenDetail',
    saga: tokenSaga,
  });
  useInjectSaga({
    key: 'status',
    saga: statusSaga,
  });

  useInjectSaga({
    key: 'activations',
    saga: activationsSaga,
  });

  useEffect(() => {
    console.log('load status..');
    loadStatus();
  }, []);

  const lightTheme = { mode: 'light' };
  const darkTheme = { mode: 'dark' };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <AppWrapper>
        <Helmet
          titleTemplate={`%s - ${getLongName()}`}
          defaultTitle={getSiteDescriptor()}
        >
          <meta name="description" content={getSiteDescriptor()} />
          <link rel="canonical" href="https://omniexplorer.info" />
          <meta name="referrer" content="always" />
        </Helmet>
        <div className="wrapper flex-grow-1">
          <Header />
          <ErrorBoundary>
            <Switch>
              <Route exact path="/:block(\d+)?" component={HomePage} />
              <Route exact path="/testnet/:block(\d+)?" component={HomePage} />

              <Route path="/tx/:tx" component={TransactionDetail} />
              <Route path="/testnet/tx/:tx" component={TransactionDetail} />

              <Route
                path="/transactions/unconfirmed"
                component={Transactions}
              />
              <Route
                path="/testnet/transactions/unconfirmed"
                component={Transactions}
              />

              <Route
                path={`/testnet/${TXS_CLASS_AB}`}
                component={Transactions}
                key={location.pathname}
              />
              <Route
                path={`/${TXS_CLASS_AB}`}
                component={Transactions}
                key={location.pathname}
              />

              <Route
                path="/address/:address/:page(\d+)?"
                component={AddressDetail}
                key={location.pathname}
              />
              <Route
                path="/testnet/address/:address/:page(\d+)?"
                component={AddressDetail}
                key={location.pathname}
              />

              <Route
                path="/search/:query?"
                component={Search}
                key={location.pathname}
              />
              <Route
                path="/testnet/search/:query"
                component={Search}
                key={location.pathname}
              />

              <Route
                path="/properties/:ecosystem"
                component={Properties}
                key={location.pathname}
              />
              <Route
                path="/testnet/properties/:ecosystem"
                component={Properties}
                key={location.pathname}
              />

              <Route
                path="/asset/:propertyid(\d+)"
                component={AssetDetail}
                key={location.pathname}
              />
              <Route
                path="/testnet/asset/:propertyid(\d+)"
                component={AssetDetail}
                key={location.pathname}
              />

              <Route
                exact
                path="/crowdsales/:ecosystem"
                component={Crowdsales}
              />
              <Route
                exact
                path="/testnet/crowdsales/:ecosystem"
                component={Crowdsales}
              />

              <Route
                path="/crowdsale/:crowdsaleid(\d+)"
                component={CrowdsaleDetail}
                key={location.pathname}
              />
              <Route
                path="/testnet/crowdsale/:crowdsaleid(\d+)"
                component={CrowdsaleDetail}
                key={location.pathname}
              />

              <Route
                exact
                path="/block/:block(\d+)"
                component={BlockDetail}
                key={location.pathname}
              />
              <Route
                exact
                path="/testnet/block/:block(\d+)"
                component={BlockDetail}
                key={location.pathname}
              />

              <Route exact path="/submitfeedback" component={Feedback} />

              {/* <Route exact path="/analytics" component={HistoryChart} /> */}
              <Route
                exact
                path="/blocks/:block(\d+)?"
                component={FullBlockList}
              />
              <Route
                exact
                path="/testnet/blocks/:block(\d+)?"
                component={FullBlockList}
              />

              <Route exact path="/activations" component={Activations} />
              <Route
                exact
                path="/testnet/activations"
                component={Activations}
              />

              <Route exact path="/testnet/exchange" component={Exchange} />

              <Route path="" component={NotFoundPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </ErrorBoundary>
        </div>
        <Footer />
        {isTestnet && <TestnetMarquee />}
        {isDev ? <DevTools /> : <div />}
        <GlobalStyle />
      </AppWrapper>
    </ThemeProvider>
  );
}

App.propTypes = {
  loadStatus: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    loadStatus: () => dispatch(startFetch()),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  // memo,
)(App);
