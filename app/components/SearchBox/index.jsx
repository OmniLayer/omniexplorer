/**
*
* SearchBox
*
*/

import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'react-icons/lib/io/search';

import messages from './messages';

const Input = styled.input.attrs({
  type: 'search',
  placeholder: messages.placeholder.defaultMessage,
})``;

const Div = styled.div``;
const Form = styled.form`
  & div.input-group > input.form-control.searchbox-input {
    outline: none;
    border-radius: 19px;
    max-width: calc( 100% - 38px );
    padding-right: 38px;
  }
  
  & div.input-group > svg.searchbox-icon {
    height: auto;
    margin-left: -2rem;
    z-index: 999;
  }
`;

class SearchBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Form className="searchbox-form">
        <Div className="input-group">
          <Input
            className="form-control searchbox-input"
          ></Input>
          <SearchIcon className="searchbox-icon" size={24} />
        </Div>
      </Form>
    );
  }
}

SearchBox.propTypes = {
  /* TODO: search box props */
};

export default SearchBox;
