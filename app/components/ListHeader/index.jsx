/**
 *
 * TransactionListHeader
 *
 */

import React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';

class ListHeader extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const StyledRow = styled(Row)`
      background-color: #7c8fa0;
      color: white;
    `;
    const HeaderTitle = styled.span`
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 16px;
      letter-spacing: 0.1rem;
      font-weight: 400;
    `;

    // const totalLabel = `${this.props.totalLabel || 'transaction'}${this.props.total > 1 ? 's' : ''}`;
    return (
      <StyledRow className="text-center-down-sm pt-2 pb-2">
        <Col sm md={8}>
          <HeaderTitle>
            <FormattedMessage
              {...this.props.message}
              values={this.props.values}
            />
            &nbsp;
            {!!this.props.total && (
              <small className="d-block d-md-inline">
                ({this.props.total}{' '}
                <FormattedPlural
                  {...this.props.message}
                  value={this.props.total}
                />)
              </small>
            )}
          </HeaderTitle>
        </Col>
        {this.props.children &&
          <Col sm>{this.props.children}</Col>
        }
      </StyledRow>
    );
  }
}

ListHeader.propTypes = {
  className: PropTypes.string,
  selectType: PropTypes.func,
  total: PropTypes.number,
  message: PropTypes.object.isRequired,
  values: PropTypes.object,
};

export default ListHeader;
