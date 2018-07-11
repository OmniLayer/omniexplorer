// import React from 'react';
import createReactClass from 'create-react-class';

// eslint-disable-next-line react/prefer-es6-class
const withLifeCycle = (spec) => (BaseComponent) => createReactClass({
  ...spec,
  render() {
    return BaseComponent(this.props);
  },
});
export default withLifeCycle;
