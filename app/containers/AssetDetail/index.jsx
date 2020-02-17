/**
 *
 * AssetDetail
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import StyledLink from 'components/StyledLink';
import { Col, Container, Row, Table } from 'reactstrap';

import { startFetch } from 'components/Token/actions';
import { makeSelectLoading, makeSelectProperties } from 'components/Token/selectors';
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

export function AssetDetail(props) {
  const { propertyid } = props.match.params;

  const getProp = propId => props.tokens[propId];

  useEffect(() => {
    if (!getProp(propertyid)) {
      props.getProperty(propertyid);
    }
  }, [propertyid]);

  const loading = (
    <Container>
      <LoadingIndicator />
    </Container>
  );

  const asset = getProp(propertyid);
  if (!asset) {
    return loading;
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
                  style={{
                    width: '4rem',
                    height: '4rem',
                  }}
                />
              </th>
              <th>
                <h4>
                  <strong>{asset.name}</strong>
                  <SubtitleDetail className={subtitleclass}>
                    <span>created by &nbsp;</span>
                    <StyledLink
                      to={{
                        pathname: `/tx/${asset.creationtxid}`,
                        state: { state: props.state },
                      }}
                    >
                      {asset.creationtxid}
                    </StyledLink>
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

AssetDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getProperty: PropTypes.func.isRequired,
  match: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  tokens: makeSelectProperties(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProperty: propertyid => dispatch(startFetch(propertyid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AssetDetail);
