import React from 'react';
import PropTypes from 'prop-types';
import LanguageProvider from 'containers/LanguageProvider/index';

import { IntlProvider } from 'react-intl';
import { translationMessages } from '../i18n';

const testWrapper = props => (
  <IntlProvider locale="en">
    <div className="wrapper">
      <LanguageProvider messages={translationMessages}>
        {props.children}
      </LanguageProvider>
    </div>
  </IntlProvider>
);

testWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default testWrapper;
