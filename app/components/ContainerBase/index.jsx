/**
 *
 * ContainerBase
 *
 */
import styled from 'styled-components';

import { Container } from 'reactstrap';

const StyledContainer = styled(Container).attrs({
  fluid: 'true',
  id: 'app-container',
})`
  //max-width: calc(1230px + 16px * 2);
  padding: 0 1rem;
  //margin-left: 64px;
  padding-top: 60px;
  //padding-left: 68px;
  //width: calc(100vw - 86px);
  //margin-left: 68px;
`;

export default StyledContainer;
