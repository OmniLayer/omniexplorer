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

const FormattedDateTime = ({ datetime, isUTC = true, key = (Date.now()) }) => {
  const id = `id_${key}`;
  
  return (
    <span>
      <FormattedMessage
        {...messages.datetime}
        values={{
          date: <FormattedDate value={datetime}/>,
          hour: <FormattedTime value={datetime} hour="numeric" minute="numeric" second="numeric"/>,
        }}
      />
      {isUTC &&
        <span>
          <InformationIcon color="gray" className="ml-1" id={id} />
          <UncontrolledTooltip placement="top" target={id}>
            <FormattedMessage {...messages.utc} />
          </UncontrolledTooltip>
        </span>
      }
  </span>
  );
};

FormattedDateTime.propTypes = {
  datetime: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
};

export default FormattedDateTime;
