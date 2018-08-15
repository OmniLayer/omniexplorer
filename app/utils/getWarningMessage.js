import React from 'react';
import { Card, CardBody, CardHeader, CardText, Col, Row } from 'reactstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: #a94442;
  border-color: #a94442;
`;
const StyledCardBody = styled(CardBody)`
  background-color: #ff5b57;
  border-color: #ff5b57;
`;

export default flags => {
  let warningMessage = null;

  if (flags.duplicate) {
    warningMessage = (
      <Row>
        <Col sm>
          <StyledCard inverse>
            <CardHeader
              style={{
                backgroundColor: '#a94442',
                borderColor: '#a94442',
              }}
            >
              Warning: Duplicated or Similar Token Name
            </CardHeader>
            <StyledCardBody>
              <CardText>
                Please note this property has a name that is either a duplicate
                or similar to a previously issued property. It is possible that
                this property is intended to imitate a different property.<br />
                <b>
                  Always verify the Property ID of any Omni Layer transaction.
                </b>
              </CardText>
            </StyledCardBody>
          </StyledCard>
        </Col>
      </Row>
    );
  }

  return warningMessage;
};
