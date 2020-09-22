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
  padding: 0 1rem;
`;

export default StyledContainer;
