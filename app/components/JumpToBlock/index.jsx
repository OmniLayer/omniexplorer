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
import { Tooltip } from 'reactstrap';

const Input = styled.input.attrs({
  type: 'number',
  placeholder: messages.placeholder.defaultMessage,
})`
  border: none !important;
  appearance: none !important;
`;
const Wrapper = styled.div.attrs({
  className: 'input-group d-flex justify-content-end align-items-center',
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

  isValid(value){
    const block = this.state.blockToJump.trim();
    return this.props.onValidate && this.props.onValidate(block);
  }

  handleJumpToBlock(e) {
    this.props.changeRoute(`/block/${this.state.blockToJump.trim()}`);
    this.setState({ blockToJump: '' });
  }

  handleKeyUp(e) {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      if (this.isValid(value)) {
        this.handleJumpToBlock(e);
      } else {
        this.setState({ tooltipOpen: true });
        setTimeout(() => this.setState({ tooltipOpen: false }), 1500);
      }
    }
  }

  render() {
    return (
      <Wrapper className="jump-to-block-form">
        <span className="d-none d-sm-inline">Jump to Block:&nbsp;</span>
        <Input
          id="jump-to-block"
          style={{ maxWidth: '9rem' }}
          className="form-control jump-to-block-input"
          value={this.state.blockToJump}
          onInput={e => this.setState({ blockToJump: e.target.value })}
          onKeyUp={e => this.handleKeyUp(e)}
          min="6" max="10"
        />
        <SearchIcon
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
