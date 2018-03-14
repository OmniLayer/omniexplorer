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
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import Moment from 'react-moment';


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

export class AssetDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.getLogo = () => {
      let logo;
      try {
        logo = require(`images/token${this.props.id}.png`);
      } catch (e) {
        logo = require('images/tokendefault.png');
      }
      return logo;
    };

    this.propertyId = this.props.match.params.propertyid.toString();
    this.props.getProperty(this.props.match.params.propertyid.toString());
    this.getTokenName = () => this.asset.name;
  }

  render() {
    const asset = this.props.properties(this.propertyId);
    const rawAssetURL = `${API_URL_BASE}/property/${this.propertyId}`;

    if (!asset) return null;

    let logo;
    try {
      logo = require(`images/token${asset.propertyid}.png`);
    } catch (e) {
      if (asset.propertyid === 4) {
        logo = require('images/sendall.png');
      } else {
        logo = require('images/tokendefault.png');
      }
    }

    let subtitleclass;
    if  (asset.propertyid < 3 ) {
      subtitleclass = 'd-none';
    }

    let tokenName;
    if (![4, -22, 25, 26].includes(asset.propertyid)) {
      tokenName = (
        <tr>
          <td className="field">Token</td>
          <td>
            <strong>
              { asset.name || asset.propertyname || type } &#40;#{ asset.propertyid }&#41;
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

    let registeredMessage;
    if (asset.registered) {
      registeredMessage = { asset.rdata };
    } else {
      registeredMessage = 'This property is not registered with OmniExplorer.info. Please see <a href="/promote">Promote Your Property</a> for further details.';
    }

    return (
      <StyledContainer fluid>
        <DetailRow>
          <Col className="col-auto mr-auto col-sm-2">
            <img
              src={logo}
              alt={asset.type}
              className="img-thumbnail"
            />
          </Col>
          <Col>
            <Table className="table-profile">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <h4>
                      <strong>{ asset.name }</strong>
                      <SubtitleDetail className={ subtitleclass }>
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
                      { asset.totaltokens } Tokens
                    </strong>
                  </td>
                </tr>
                { tokenName }
                <tr>
                  <td className="field">Created</td>
                  <td>
                    <span id="ldatetime">
                      <Moment unix>
                        { asset.blocktime }
                      </Moment>
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
                      { asset.divisible }
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
                  <td>
                    <a
                      href={asset.url}
                    >
                      { asset.url }
                    </a>
                  </td>
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
                        Click here for raw asset info
                      </a>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="field">Registration</td>
                  <td>{ registeredMessage }</td>
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
};

const mapStateToProps = createStructuredSelector({
  properties: (state) => makeSelectProperty(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProperty: (propertyId) => dispatch(startFetch(propertyId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AssetDetail);
