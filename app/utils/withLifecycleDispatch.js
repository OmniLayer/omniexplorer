import React from 'react';
import createReactClass from 'create-react-class';

const withLifeCycle = (spec) => (BaseComponent) => {
  return createReactClass({
    ...spec,
    render() {
      return BaseComponent(this.props);
    }
  })
}
export default withLifeCycle;
