/**
 *
 * TimerCard
 *
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'timer-card rounded shadow bg-white d-inline-block',
})`
  height: 5rem;
  width: 5rem;
  :not(:first-child) {
    margin-left: 3px;
  }
`;

const Card = styled.div.attrs({
  className: 'rounded-top flex-nowrap h-50 w-100 align-self-center',
})`
	font-size: 3.3rem;
  background-color: #f7f7f7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

function TimerCard(props) {
  return (
    <Container>
      <Card>
        { props.children }
      </Card>
    </Container>
  );
}

TimerCard.propTypes = {};

export default TimerCard;
