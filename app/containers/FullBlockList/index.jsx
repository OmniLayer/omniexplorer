/**
 *
 * FullBlockList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Blocks from 'containers/Blocks';
import { loadBlocks } from 'containers/Blocks/actions';
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

export class FullBlockList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const loadMoreBlocks = (
      <LoadMoreBlocks>
        <Col sm>
          <div
            onClick={()=>this.props.loadBlocks()}
          >
            <FormattedMessage {...messages.footer} />
          </div>
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

FullBlockList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loadBlocks: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadBlocks: () => dispatch(loadBlocks()),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(FullBlockList);
