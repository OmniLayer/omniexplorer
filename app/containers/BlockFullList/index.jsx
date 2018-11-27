/**
 *
 * BlockFullList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Blocks from 'containers/Blocks';

import styled from 'styled-components';
import { Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const LoadMoreBlocks = styled.div.attrs({
  className: 'text-center',
})`
  background-color: black;
  color: white;

  letter-spacing: 0.1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;

  a {
    color: white;
  }
`;

export class BlockFullList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const loadMoreBlocks = (
      <LoadMoreBlocks>
        <Col sm>
          <FormattedMessage {...messages.footer} />
        </Col>
      </LoadMoreBlocks>
    );

    return (
      <div>
        <Blocks />
        {loadMoreBlocks}
      </div>
    );
  }
}

BlockFullList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(BlockFullList);
