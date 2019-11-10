/**
 *
 * JumpToBlock
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { push } from 'connected-react-router';

import { IoIosSearch } from 'react-icons/io';
import { Tooltip } from 'reactstrap';
import messages from './messages';
import { compose } from 'redux';
import history from 'utils/history';

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

// class JumpToBlock extends React.PureComponent {
export function JumpToBlock(props) {
  // eslint-disable-line react/prefer-stateless-function
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     blockToJump: '',
  //     tooltipOpen: false,
  //   };
  // }
  const [blockToJump, setBlockToJump] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState('');
  // const [idTimeout, setIdTimeout] = useState('');
  
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
  
  // componentWillUnmount();
  // {
  //   clearTimeout(idTimeout);
  // }
  
  const isValid = value =>
    props.onValidate && value && props.onValidate(value);
  
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
      <IoIosSearch
        className="jump-to-block-icon"
        size={24}
        onClick={e => handleJumpToBlock(e)}
      />
      <Tooltip
        hideArrow
        isOpen={tooltipOpen}
        target="jump-to-block"
      >
        Requested block is invalid
      </Tooltip>
    </Wrapper>
  );
  // }
}

JumpToBlock.propTypes = {};

const mapDispatchToProps = (dispatch) => ({
  push: (path) => {
    dispatch(history.push(path));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(JumpToBlock);
