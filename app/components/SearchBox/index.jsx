/**
 *
 * SearchBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import styled from 'styled-components';
import SearchIcon from 'react-icons/lib/io/search';

import messages from './messages';

const Input = styled.input.attrs({
  type: 'search',
  placeholder: messages.placeholder.defaultMessage,
})``;

const Wrapper = styled.div`
  & div.input-group > input.form-control.searchbox-input {
    outline: none;
    border-radius: 19px;
    max-width: calc( 100% - 38px );
    padding-right: 38px;
  }
  
  & div.input-group > svg.searchbox-icon {
    height: auto;
    margin-left: -3rem;
    z-index: 999;
  }
`;

class SearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleKeyUp(e) {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      this.props.changeRoute(`/search/${e.target.value}`);
      e.target.value = '';
    }
  }

  render() {
    return (
      <Wrapper className="searchbox-form">
        <div className="input-group">
          <Input
            className="form-control searchbox-input"
            onKeyUp={this.handleKeyUp.bind(this)}
          ></Input>
          <SearchIcon className="searchbox-icon" size={24} />
        </div>
      </Wrapper>
    );
  }
}

SearchBox.propTypes = {
  changeRoute: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchBox);
