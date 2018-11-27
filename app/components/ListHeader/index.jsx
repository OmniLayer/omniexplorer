/**
 *
 * TransactionListHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';

class ListHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  render() {
    const StyledRow = styled(Row)`
      background-color: black;
      color: white;
    `;
    const HeaderTitle = styled.span`
      	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 16px;
        letter-spacing: 0.1rem;
        font-weight: 300;
    `;

    const totalLabel = `${this.props.totalLabel || 'transaction'}${this.props.total > 1 ? 's' : ''}`;
    return (
      <StyledRow className="text-center-down-sm pt-2 pb-2">
        <Col sm>
          <HeaderTitle>
            <FormattedMessage {...this.props.messages.header} values={this.props.values} />
            &nbsp;
            {!!this.props.total &&
            <small>{this.props.total} {totalLabel}</small>
            }
          </HeaderTitle>
        </Col>
        <Col sm>
          { this.props.children }
        </Col>
      </StyledRow>
    );
  }
}

ListHeader.propTypes = {
  className: PropTypes.string,
  selectType: PropTypes.func,
  total: PropTypes.number,
  totalLabel: PropTypes.string,
  messages: PropTypes.object.isRequired,
};

export default ListHeader;
