/**
 *
 * AssetDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Moment from 'react-moment';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardText, Col, Collapse, Container, Progress, Row, Table } from 'reactstrap';
import { CONFIRMATIONS } from 'containers/Transactions/constants';
import { API_URL_BASE } from 'containers/App/constants';

import { startFetch } from 'components/Token/actions';
import { makeSelectProperty } from 'components/Token/selectors';
import messages from './messages';


const StyledContainer = styled(Container)`
      background-color: white;
    `;
const StyledCard = styled(Card)`
      background-color: #2A72B5;
      border-color: #2A72B5;
    `;
const StyledCardBody = styled(CardBody)`
      background-color: #348FE2;
      border-color: #348FE2;
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
const A = styled.a`
      color: #41addd;

      &:hover {
        color: #6cc0e5;
      }
    ;`;

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
    
    if(!asset) return null;
    
    let logo;
    try {
      logo = require(`images/token${asset.propertyid}.png`);
    } catch (e) {
      if (asset.type_int === 4) {
        logo = require('images/sendall.png');
      } else {
        logo = require('images/tokendefault.png');
      }
    }
    
    let tokenName;
    if (![4, -22, 25, 26].includes(asset.type_int)) {
      tokenName = (<tr>
        <td className="field">Token</td>
        <td><a href="/asset"><strong>{ asset.propertyname } &#40;#{ asset.propertyid }&#41;</strong></a></td>
      </tr>);
    }
    if (asset.type_int === 28) {
      tokenName = (<tr>
        <td className="field">Ecosystem</td>
        <td><strong>{ asset.ecosystem }</strong></td>
      </tr>);
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
                  <h4>{ asset.type }
                    <SubtitleDetail>
                      <span>
                        created by
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
              <tr>
                <td className="field">Token</td>
                <td><a href="/asset"><strong>{ asset.propertyname } &#40;#{ asset.propertyid }&#41;</strong></a></td>
              </tr>
              <tr>
                <td className="field">Created</td>
                <td>
                   <span>
                    ...
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
                    { (asset.divisible ? 'Divisible' : 'No divisible') }
                  </span>
                </td>
              </tr>
              <tr>
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
              <tr>
                <td className="field">Price</td>
                <td>
                  <span id="lblocknum">
                    Coming soon...
                  </span>
                </td>
              </tr>
              <tr>
                <td className="field">Markets</td>
                <td>
                  <span id="lblocknum">
                    Coming soon...
                  </span>
                </td>
              </tr>
              <tr>
                <td className="field">Registration</td>
                <td>This property is not registered with OmniExplorer.info. Please see <a href="/promote">Promote Your Property</a> for further details.</td>
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
