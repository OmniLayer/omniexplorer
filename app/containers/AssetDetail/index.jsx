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
import { Col, Container, Row, Table } from 'reactstrap';

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import AssetInfo from 'components/AssetInfo';
import LoadingIndicator from 'components/LoadingIndicator';
import ContainerBase from 'components/ContainerBase';
import AssetLogo from 'components/AssetLogo';

import getWarningMessage from 'utils/getWarningMessage';

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
      <ContainerBase fluid>
        {warningMessage}
        <DetailRow>
          <Col sm>
            <Table responsive className="table-horizontal">
              <thead>
                <tr>
                  <th>
                    <AssetLogo
                      asset={asset}
                      prop={asset.propertyid}
                      className="img-thumbnail"
                      style={{width: '4rem', height: '4rem'}}
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
                            state: { state: this.props.state },
                          }}
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
      </ContainerBase>
    );
  }
}

AssetDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getProperty: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  properties: PropTypes.func.isRequired,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  properties: state => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProperty: propertyId => dispatch(startFetch(propertyId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AssetDetail);
