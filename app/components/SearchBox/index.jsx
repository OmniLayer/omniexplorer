/**
 *
 * SearchBox
 *
 */

import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import {Search} from '@styled-icons/fa-solid/Search';
import history from 'utils/history';

import messages from './messages';

const Input = styled.input.attrs({
  type: 'search',
  placeholder: messages.placeholder.defaultMessage,
})``;

const Wrapper = styled.div.attrs({
  className: 'mb-3 mb-sm-0',
})`
  & div.input-group > input.form-control.searchbox-input {
    outline: none;
    border-radius: 19px;
    max-width: 100%;
    padding-right: 38px;
  }

  & div.input-group > svg.searchbox-icon {
    height: auto;
    margin-left: -3rem;
    z-index: 999;
    cursor: pointer;
  }
`;

export function SearchBox(props) {
  const [query, setQuery] = useState('');

  const handleDoSearch = (e) => {
    history.push(`/search/${query.trim()}`);
    setQuery('');
  };

  const handleKeyUp = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      handleDoSearch(e);
    }
  };

  return (
    <Wrapper className="searchbox-form">
      <div className="input-group">
        <Input
          value={query}
          className="form-control searchbox-input"
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        >
        </Input>
        <Search className="searchbox-icon" size={21} onClick={(e) => handleDoSearch(e)} />
      </div>
    </Wrapper>
  );
}

SearchBox.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    push,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(SearchBox);
