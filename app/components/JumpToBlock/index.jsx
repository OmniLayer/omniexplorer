/**
 *
 * JumpToBlock
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Search } from '@styled-icons/fa-solid/Search';

import { Tooltip } from 'reactstrap';
import { compose } from 'redux';
import history from 'utils/history';
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

export function JumpToBlock(props) {
  const [blockToJump, setBlockToJump] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const timerToTooltipOpen = useRef(false);
  useEffect(() => {
    if (tooltipOpen) {
      timerToTooltipOpen.current = setTimeout(
        () => setTooltipOpen(false),
        1500,
      );
    }

    return () => {
      clearTimeout(timerToTooltipOpen.current);
    };
  }, [tooltipOpen]);

  const isValid = value => props.onValidate && value && props.onValidate(value);

  const handleJumpToBlock = e => {
    // setBlockToJump(blockToJump.trim());
    history.push(`/block/${blockToJump}`);
  };

  const handleKeyUp = e => {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      if (isValid(value)) {
        handleJumpToBlock(e);
      } else {
        setTooltipOpen(true);
      }
    }
  };

  return (
    <Wrapper className="jump-to-block-form">
      <span className="d-none d-sm-inline">Jump to Block:&nbsp;</span>
      <Input
        id="jump-to-block"
        style={{ maxWidth: '9rem' }}
        className="form-control jump-to-block-input"
        onInput={e => setBlockToJump(e.target.value)}
        onKeyUp={e => handleKeyUp(e)}
      />
      <Search
        className="jump-to-block-icon ml-1"
        size={21}
        onClick={e => handleJumpToBlock(e)}
      />
      <Tooltip hideArrow isOpen={tooltipOpen} target="jump-to-block">
        Requested block is invalid
      </Tooltip>
    </Wrapper>
  );
  // }
}

JumpToBlock.propTypes = {};

const mapDispatchToProps = dispatch => ({
  push: path => {
    dispatch(history.push(path));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(JumpToBlock);
