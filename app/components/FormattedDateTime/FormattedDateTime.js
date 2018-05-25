/**
 *
 * FormattedDateTime
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import InformationIcon from 'react-icons/lib/io/informatcircled';
import { UncontrolledTooltip } from 'reactstrap';

import messages from './messages';

const FormattedDateTime = ({ datetime, isUTC = true, key = (Date.now()) }) => (
  <span>
    <FormattedMessage
      {...messages.datetime}
      values={{
        date: <FormattedDate value={datetime}/>,
        hour: <FormattedTime value={datetime} hour="numeric" minute="numeric" second="numeric"/>,
      }}
    />
    <InformationIcon color="gray" className="ml-1" id={key}/>
    {isUTC &&
    <UncontrolledTooltip placement="top" target={key}>
      <FormattedMessage {...messages.utc} />
    </UncontrolledTooltip>
    }
  </span>
);

FormattedDateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default FormattedDateTime;
