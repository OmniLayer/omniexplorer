/* eslint-disable react/prefer-es6-class,no-unused-vars */
import React from 'react';
import createReactClass from 'create-react-class';

const withLifeCycle = spec => BaseComponent =>
  createReactClass({
    ...spec,
    render() {
      return BaseComponent(this.props);
    },
  });
export default withLifeCycle;
