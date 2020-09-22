import React from 'react';
import { Spinner } from 'reactstrap';

import Wrapper from './Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
  </Wrapper>
);

export default LoadingIndicator;
