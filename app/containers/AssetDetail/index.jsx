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
import { Card, CardBody, CardHeader, CardText, Col, Container, Row, Table } from 'reactstrap';
import { API_URL_BASE } from 'containers/App/constants';

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import SanitizedFormattedNumber from 'components/SanitizedFormattedNumber';
import { FormattedUnixDateTime } from 'components/FormattedDateTime';
import LoadingIndicator from 'components/LoadingIndicator';

const StyledContainer = styled(Container)`
      background-color: white;
    `;
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
const StyledCard = styled(Card)`
      background-color: #a94442;
      border-color: #a94442;
    `;
const StyledCardBody = styled(CardBody)`
      background-color: #ff5b57;
      border-color: #ff5b57;
    `;

export class AssetDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getLogo = () => {
      let logo;
      try {
        logo = require(`images/token${this.props.id}.png`);
      } catch (e) {
        if (this.props.id > 2147483650) {
          logo = require('images/tokenwarn.png');
        } else {
          logo = require('images/tokendefault.png');
        }
      }
      return logo;
    };

    this.propertyId = this.props.match.params.propertyid.toString();
    this.props.getProperty(this.props.match.params.propertyid.toString());
  }

  render() {
    const asset = this.props.properties(this.propertyId);
    const rawAssetURL = `${API_URL_BASE}/property/${this.propertyId}`;

    if (!asset) {
      return (
        <Container fluid>
          <LoadingIndicator />
        </Container>
      );
    }

    let logo;
    try {
      logo = require(`images/token${asset.propertyid}.png`);
    } catch (e) {
      if (asset.propertyid > 2147483650) {
        logo = require('images/tokenwarn.png');
      } else {
        logo = require('images/tokendefault.png');
      }
    }

    let warningMessage = null;
    if (asset.flags.duplicate) {
      warningMessage = (<Row>
        <Col sm>
          <StyledCard inverse>
            <CardHeader style={{ backgroundColor: '#a94442', borderColor: '#a94442' }}>Warning: Duplicated or Similar Token Name</CardHeader>
            <StyledCardBody>
              <CardText>
                Please note this property has a name that is either a duplicate or similar to a previously issued property.
                It is possible that this property is intended to imitate a different property.<br />
                <b>Always verify the Property ID of any Omni Layer transaction.</b>
              </CardText>
            </StyledCardBody>
          </StyledCard>
        </Col>
      </Row>);
    }

    let subtitleclass;
    if (asset.propertyid < 3) {
      subtitleclass = 'd-none';
    }

    let tokenName;
    let propertyID;
    if (![4, -22, 25, 26].includes(asset.propertyid)) {
      tokenName = (
        <tr>
          <td className="field">Name</td>
          <td>
            <strong>
              { asset.name || asset.propertyname || asset.type }
            </strong>
          </td>
        </tr>);
      propertyID = (
        <tr>
          <td className="field">PropertyID</td>
          <td>
            <strong>
              { asset.propertyid }
            </strong>
          </td>
        </tr>);
    }
    if (asset.propertyid === 28) {
      tokenName = (<tr>
        <td className="field">Ecosystem</td>
        <td><strong>{ asset.ecosystem }</strong></td>
      </tr>);
    }

    let asseturl;
    if (asset.url.includes('.')) {
      asseturl = (
        <td>
          <a
            href={asset.url}
            target="_blank"
          >
            { asset.url }
          </a>
        </td>);
    } else {
      asseturl = (
        <td>
          { asset.url }
        </td>);
    }


    let registeredMessage;
    if (asset.flags.registered) {
      registeredMessage = (<td dangerouslySetInnerHTML={{ __html: asset.rdata }}></td>);
    } else {
      registeredMessage = (<td>This property is not registered with OmniExplorer.info. Please see <a href="/promote">Promote Your Property</a> for further details.</td>);
    }

    return (
      <StyledContainer fluid>
        { warningMessage }
        <DetailRow>
          <Col sm="2" className="col-auto mx-auto">
            <img
              src={logo}
              alt={asset.type}
              className="img-thumbnail"
            />
          </Col>
          <Col sm>
            <Table responsive className="table-profile">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <h4>
                      <strong>{ asset.name }</strong>
                      <SubtitleDetail className={subtitleclass}>
                        <span>
                        created by &nbsp;
                        </span>
                        <Link
                          to={{
                            pathname: `/tx/${asset.creationtxid}`,
                          }}
                          onClick={() => this.props.changeRoute(`/tx/${asset.creationtxid}`)}
                        >
                          { asset.creationtxid }
                        </Link>
                      </SubtitleDetail>
                    </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="field">Total</td>
                  <td>
                    <strong>
                      <SanitizedFormattedNumber value={asset.totaltokens} /> Tokens
                    </strong>
                  </td>
                </tr>
                { tokenName }
                { propertyID }
                <tr>
                  <td className="field">Created</td>
                  <td>
                    <span id="ldatetime">
                      <FormattedUnixDateTime datetime={asset.blocktime} />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Data</td>
                  <td>
                    <span>
                      { asset.data }
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Sender</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/address/${asset.issuer}`,
                      }}
                      onClick={() => this.props.changeRoute(`/address/${asset.issuer}`)}
                    >
                      { asset.issuer }
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="field">Category</td>
                  <td>
                    <span id="lblocknum">
                      { asset.category }
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Divisible</td>
                  <td>
                    <span id="lblocknum">
                      { (asset.divisible ? 'True' : 'False') }
                    </span>
                  </td>
                </tr>
                <tr className="d-none">
                  <td className="field">Distribution</td>
                  <td>
                    <span id="lblocknum">
                    Coming soon...
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">URL</td>
                  { asseturl }
                </tr>
                <tr className="d-none">
                  <td className="field">Price</td>
                  <td>
                    <span id="lblocknum">
                    Coming soon...
                    </span>
                  </td>
                </tr>
                <tr className="d-none">
                  <td className="field">Markets</td>
                  <td>
                    <span id="lblocknum">
                    Coming soon...
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Raw Data</td>
                  <td >
                    <span id="lrawgettx">
                      <a href={rawAssetURL}>
                        Click here for raw info
                      </a>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Registration</td>
                  { registeredMessage }
                </tr>
              </tbody>
            </Table>
          </Col>
        </DetailRow>
        <Row>
        </Row>
      </StyledContainer>
    );
  }
}

AssetDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  properties: (state) => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProperty: (propertyId) => dispatch(startFetch(propertyId)),
    changeRoute: (url) => dispatch(routeActions.push(url)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, )(AssetDetail);
