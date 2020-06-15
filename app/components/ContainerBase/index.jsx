/**
 *
 * ContainerBase
 *
 */
import styled from 'styled-components';
import { Container } from 'reactstrap';

const StyledContainer = styled(Container).attrs({
  fluid: 'true',
})`
  padding: 0 1rem;
  padding-top: 7.7rem;
`;

export default StyledContainer;
