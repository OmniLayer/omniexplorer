/**
 *
 * TimerCard
 *
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs({
  className: 'timer-card rounded shadow',
})`
  height: 4rem;
  width: 4rem;
  overflow: hidden;
`;

const Card = styled.div.attrs({
  className: 'rounded-top flex-nowrap h-50 w-100 align-self-center timer-card-top',
})`
	font-size: 2.5rem;
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
