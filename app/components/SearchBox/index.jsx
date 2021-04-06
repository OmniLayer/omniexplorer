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
import history from 'utils/history';
import SearchIcon from 'components/SearchIcon';
import { getSufixURL } from 'utils/getLocationPath';

import messages from './messages';

const Input = styled.input.attrs({
  type: 'search',
  placeholder: messages.placeholder.defaultMessage,
})``;

const Wrapper = styled.div.attrs({
  className: 'mb-3 mb-sm-0 searchbox-form rounded',
})`
  & .searchbox-input {
    outline: none;
    max-width: 100%;
    padding-right: 38px;
  }
`;

const SearchBox = () => {
  const [query, setQuery] = useState('');

  const handleDoSearch = () => {
    if (query) {
      const searchURL = `${getSufixURL()}/search/${query.trim()}`;
      history.push(searchURL);
      setQuery('');
    }
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleDoSearch();
    }
  };

  const handleChange = ({ target }) => {
    setQuery(target.value);
  };

  return (
    <Wrapper>
      <div className="input-group">
        <Input
          value={query}
          className="form-control searchbox-input rounded"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon
          disabled={!query}
          onClick={() => !!query && handleDoSearch()}
        />
      </div>
    </Wrapper>
  );
};

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
