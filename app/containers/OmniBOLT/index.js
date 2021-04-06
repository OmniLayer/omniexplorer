/**
 *
 * OmniBOLT
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classnames from 'classnames';

import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Row } from 'reactstrap';
import ContainerBase from 'components/ContainerBase';
import OmniBOLTNodes from 'components/OmniBOLTNodes';
import OmniBOLTChannels from 'components/OmniBOLTChannels';
import OmniBOLTUsers from 'components/OmniBOLTUsers';

import {
 OMNIBOLT_NODES_TAB,
 OMNIBOLT_CHANNELS_TAB,
 OMNIBOLT_USERS_TAB,
} from './constants';
import makeSelectOmniBOLT from './selectors';
import messages from './messages';

export function OmniBOLT() {
  // useInjectReducer({ key: 'OmniBOLT', reducer });
  // useInjectSaga({ key: 'OmniBOLT', saga });

  const [activeTab, setActiveTab] = useState(OMNIBOLT_NODES_TAB);

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <ContainerBase>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === OMNIBOLT_NODES_TAB })}
            onClick={() => { toggle(OMNIBOLT_NODES_TAB); }}
          >
            Nodes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === OMNIBOLT_CHANNELS_TAB })}
            onClick={() => { toggle(OMNIBOLT_CHANNELS_TAB); }}
          >
            Channels
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === OMNIBOLT_USERS_TAB })}
            onClick={() => { toggle(OMNIBOLT_USERS_TAB); }}
          >
            Users
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={OMNIBOLT_NODES_TAB}>
          <Row noGutters>
            <Col sm>
              <OmniBOLTNodes />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={OMNIBOLT_CHANNELS_TAB}>
          <Row noGutters>
            <Col sm>
              <OmniBOLTChannels />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={OMNIBOLT_USERS_TAB}>
          <Row noGutters>
            <Col sm>
              <OmniBOLTUsers />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </ContainerBase>
  );
}

OmniBOLT.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  OmniBOLT: makeSelectOmniBOLT(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OmniBOLT);
