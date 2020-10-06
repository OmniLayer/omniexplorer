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
import { Search } from '@styled-icons/fa-solid/Search';
import history from 'utils/history';
import getLocationPath, { getSufixURL } from 'utils/getLocationPath';

import messages from './messages';

const Input = styled.input.attrs({
  type: 'search',
  placeholder: messages.placeholder.defaultMessage,
})``;

const Wrapper = styled.div.attrs({
  className: 'mb-3 mb-sm-0 searchbox-form rounded',
})`
  & div.input-group > input.form-control.searchbox-input {
    outline: none;
    max-width: 100%;
    padding-right: 38px;
  }

  & div.input-group > svg.searchbox-icon {
    height: auto;
    margin-left: -3rem;
    z-index: 333;
    cursor: pointer;
  }
`;

export function SearchBox(props) {
  const [query, setQuery] = useState('');

  const handleDoSearch = e => {
    const searchURL = `${getSufixURL()}/search/${query.trim()}`;
    history.push(searchURL);
    setQuery('');
  };

  const handleKeyUp = e => {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      handleDoSearch(e);
    }
  };

  return (
    <Wrapper>
      <div className="input-group">
        <Input
          value={query}
          className="form-control searchbox-input rounded"
          onChange={e => setQuery(e.target.value)}
          onKeyUp={e => handleKeyUp(e)}
        />
        <Search
          className="searchbox-icon"
          size={21}
          onClick={e => handleDoSearch(e)}
        />
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

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SearchBox);
