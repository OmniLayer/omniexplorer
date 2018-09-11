/**
 *
 * AssetDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { routeActions } from 'redux-simple-router';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import AssetInfo from 'components/AssetInfo';
import LoadingIndicator from 'components/LoadingIndicator';
import getLogo from 'utils/getLogo';
import getWarningMessage from 'utils/getWarningMessage';

const StyledContainer = styled(Container)``;
const DetailRow = styled(Row)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const SubtitleDetail = styled.small`
  display: block;
  font-size: 10px;
  font-weight: 400;
  margin-top: 5px;
`;

export class AssetDetail extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.propertyId = this.props.match.params.propertyid.toString();
    this.props.getProperty(this.props.match.params.propertyid.toString());
  }

  render() {
    const asset = this.props.properties(this.propertyId);

    if (!asset) {
      return (
        <Container fluid>
          <LoadingIndicator />
        </Container>
      );
    }

    const logo = getLogo(asset.propertyid, asset);
    const warningMessage = getWarningMessage(
      asset.flags,
      asset.name,
      asset.propertyid,
    );

    let subtitleclass;
    if (asset.propertyid < 3) {
      subtitleclass = 'd-none';
    }

    return (
      <StyledContainer fluid>
        {warningMessage}
        <DetailRow>
          <Col sm>
            <Table responsive className="table-profile">
              <thead>
                <tr>
                  <th>
                    <img
                      src={logo}
                      alt={asset.type}
                      className="img-thumbnail"
                      width="42px"
                      height="42px"
                    />
                  </th>
                  <th>
                    <h4>
                      <strong>{asset.name}</strong>
                      <SubtitleDetail className={subtitleclass}>
                        <span>created by &nbsp;</span>
                        <Link
                          to={{
                            pathname: `/tx/${asset.creationtxid}`,
                          }}
                          onClick={() =>
                            this.props.changeRoute(`/tx/${asset.creationtxid}`)
                          }
                        >
                          {asset.creationtxid}
                        </Link>
                      </SubtitleDetail>
                    </h4>
                  </th>
                </tr>
              </thead>
              <AssetInfo {...asset} />
            </Table>
          </Col>
        </DetailRow>
        <Row />
      </StyledContainer>
    );
  }
}

AssetDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  properties: state => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProperty: propertyId => dispatch(startFetch(propertyId)),
    changeRoute: url => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AssetDetail);
