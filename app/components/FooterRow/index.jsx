/**
 *
 * ContainerBase
 *
 */
import styled from 'styled-components';
import { Row } from 'reactstrap';

const FooterRow = styled(Row).attrs({
  className: 'no-gutters',
})`
  letter-spacing: 0.1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;

  a {
  }
`;

export default FooterRow;
