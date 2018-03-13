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
    cursor: pointer;
  }
`;

class SearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  
  handleDoSearch(e) {
    this.props.changeRoute(`/search/${this.state.query}`);
    // e.target.value = '';
    this.setState({ query: '' });
  }
  
  handleKeyUp(e) {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      this.handleDoSearch(e);
    }
  }
  
  render() {
    return (
      <Wrapper className="searchbox-form">
        <div className="input-group">
          <Input
            className="form-control searchbox-input"
            value={this.state.query}
            onInput={(e) => this.setState({ query: e.target.value.trim() })}
            onKeyUp={this.handleKeyUp.bind(this)}
          ></Input>
          <SearchIcon className="searchbox-icon" size={24} onClick={this.handleDoSearch.bind(this)}/>
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
