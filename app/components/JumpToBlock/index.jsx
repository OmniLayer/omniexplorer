/**
 *
 * JumpToBlock
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
  type: 'number',
  placeholder: messages.placeholder.defaultMessage,
})`
	border: none;
  appearance: none;
`;
const Wrapper = styled.div.attrs({
  className: 'input-group d-flex justify-content-end align-items-center',
})`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
`;
const StyledInputJumpTo = styled.input.attrs({
  type: 'text',
  name: 'blockToJump',
})`
  background-color: white;
  color: black;
`;

class JumpToBlock extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      blockToJump: '',
    };
  }

  handleJumpToBlock(e) {
    this.props.changeRoute(`/block/${this.state.blockToJump.trim()}`);
    this.setState({ blockToJump: '' });
  }

  handleKeyUp(e) {
    const value = e.target.value;
    if (e.keyCode === 13 && value) {
      this.handleJumpToBlock(e);
    }
  }

  render() {
    return (
      <Wrapper className="jump-to-block-form">
        <span>Jump to Block:&nbsp;</span>
        <Input
          className="form-control jump-to-block-input"
          value={this.state.blockToJump}
          onInput={e => this.setState({ blockToJump: e.target.value })}
          onKeyUp={e => this.handleKeyUp(e)}
        />
        <SearchIcon
          className="jump-to-block-icon"
          size={24}
          onClick={e => this.handleJumpToBlock(e)}
        />
      </Wrapper>
    );
  }
}

JumpToBlock.propTypes = {
  changeRoute: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(routeActions.push(url)),
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(JumpToBlock);
