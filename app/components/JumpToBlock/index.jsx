/**
 *
 * JumpToBlock
 *
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { IoIosSearch } from 'react-icons/io';
import { Tooltip } from 'reactstrap';
import messages from './messages';

const Input = styled.input.attrs({
  type: 'number',
  placeholder: messages.placeholder.defaultMessage,
})`
  border: none !important;
  appearance: none !important;
`;
const Wrapper = styled.div.attrs({
  className:
    'input-group d-flex justify-content-center justify-content-md-end align-items-center',
})`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
`;

class JumpToBlock extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      blockToJump: '',
      tooltipOpen: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.idTimeout);
  }

  isValid = value =>
    this.props.onValidate && value && this.props.onValidate(value);

  handleJumpToBlock = e => {
    this.props.push(`/block/${this.state.blockToJump.trim()}`);
    this.setState({ blockToJump: '' });
  };

  handleKeyUp = e => {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      if (this.isValid(value)) {
        this.handleJumpToBlock(e);
      } else {
        this.setState({ tooltipOpen: true });
        this.idTimeout = setTimeout(
          () => this.setState({ tooltipOpen: false }),
          1500,
        );
      }
    }
  };

  render() {
    return (
      <Wrapper className="jump-to-block-form">
        <span className="d-none d-sm-inline">Jump to Block:&nbsp;</span>
        <Input
          id="jump-to-block"
          style={{ maxWidth: '9rem' }}
          className="form-control jump-to-block-input"
          onInput={e => this.setState({ blockToJump: e.target.value })}
          onKeyUp={e => this.handleKeyUp(e)}
        />
        <IoIosSearch
          className="jump-to-block-icon"
          size={24}
          onClick={e => this.handleJumpToBlock(e)}
        />
        <Tooltip
          hideArrow
          isOpen={this.state.tooltipOpen}
          target="jump-to-block"
        >
          Requested block is invalid
        </Tooltip>
      </Wrapper>
    );
  }
}

JumpToBlock.propTypes = {};

export default connect(
  null,
  { push },
)(JumpToBlock);
