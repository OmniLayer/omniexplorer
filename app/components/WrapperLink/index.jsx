/**
 *
 * WrapperLink
 *
 */
import styled from 'styled-components';

const WrapperLink = styled.div.attrs({
  className: 'wrapper-link text-truncate rounded',
})`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  user-select: text !important;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  font-size: 1.25rem !important;
  font-weight: 400;
  width: 44%;
  color: #333;
  background-color: #eff5fb !important;
  border: 1px solid #e2e7eb;
`;

export default WrapperLink;
