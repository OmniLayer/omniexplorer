/**
 *
 * ContainerBase
 *
 */
import styled from 'styled-components';
import { Row } from 'reactstrap';

const FooterRow = styled(Row)`
  background-color: #7c8fa0;
  color: white;

  letter-spacing: 0.1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;

  a {
    color: white;
  }
`;

export default FooterRow;
