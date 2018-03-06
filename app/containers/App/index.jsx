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
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import TransactionDetail from 'containers/TransactionDetail';
import AddressDetail from 'containers/AddressDetail';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import Header from 'components/Header';

import DevTools from 'utils/devTools';
import Moment from 'react-moment';

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

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Omni Explorer"
        defaultTitle="Omni Explorer"
      >
        <meta name="description" content="Omni Explorer" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/tx/:tx" component={TransactionDetail} />
        <Route path="/address/:address" component={AddressDetail} />
        <Route path="" component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      { isDev
        ? <DevTools />
        : <div></div>
      }
    </AppWrapper>
  );
}
