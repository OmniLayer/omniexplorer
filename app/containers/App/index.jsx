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
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import Header from 'components/Header';


// Import DevTools, only for dev environment
import DevTools from 'utils/devTools';
const isDev = process.env.NODE_ENV !== 'production';

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
        <Route path="/trx" component={TransactionDetail} />
        <Route path="" component={NotFoundPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      { isDev
        ? <DevTools />
        : null
      }
    </AppWrapper>
  );
}
