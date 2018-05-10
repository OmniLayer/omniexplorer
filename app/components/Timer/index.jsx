/**
*
* Timer
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import moment from 'moment';

import TimerCard from './TimerCard';
import messages from './messages';

const Container = styled.div.attrs({
  className: 'timer',
})`
`;
function Timer(props) {
  function calculateTimeUnits() {
    const timeUnits = {}; // will contains time with units

    if (props.datetime) {
      this.millis = moment().diff(moment(props.datetime));
    }

    // timeUnits = i18nService.getTimeUnits(this.millis);

    // compute time values based on maxTimeUnit specification
    if (!this.maxTimeUnit || this.maxTimeUnit === 'day') {
      this.seconds = Math.floor((this.millis / 1000) % 60);
      this.minutes = Math.floor(((this.millis / (60000)) % 60));
      this.hours = Math.floor(((this.millis / (3600000)) % 24));
      this.days = Math.floor(((this.millis / (3600000)) / 24));
      this.months = 0;
      this.years = 0;
    } else if (this.maxTimeUnit === 'second') {
      this.seconds = Math.floor(this.millis / 1000);
      this.minutes = 0;
      this.hours = 0;
      this.days = 0;
      this.months = 0;
      this.years = 0;
    } else if (this.maxTimeUnit === 'minute') {
      this.seconds = Math.floor((this.millis / 1000) % 60);
      this.minutes = Math.floor(this.millis / 60000);
      this.hours = 0;
      this.days = 0;
      this.months = 0;
      this.years = 0;
    } else if (this.maxTimeUnit === 'hour') {
      this.seconds = Math.floor((this.millis / 1000) % 60);
      this.minutes = Math.floor(((this.millis / (60000)) % 60));
      this.hours = Math.floor(this.millis / 3600000);
      this.days = 0;
      this.months = 0;
      this.years = 0;
    } else if (this.maxTimeUnit === 'month') {
      this.seconds = Math.floor((this.millis / 1000) % 60);
      this.minutes = Math.floor(((this.millis / (60000)) % 60));
      this.hours = Math.floor(((this.millis / (3600000)) % 24));
      this.days = Math.floor(((this.millis / (3600000)) / 24) % 30);
      this.months = Math.floor(((this.millis / (3600000)) / 24) / 30);
      this.years = 0;
    } else if (this.maxTimeUnit === 'year') {
      this.seconds = Math.floor((this.millis / 1000) % 60);
      this.minutes = Math.floor(((this.millis / (60000)) % 60));
      this.hours = Math.floor(((this.millis / (3600000)) % 24));
      this.days = Math.floor(((this.millis / (3600000)) / 24) % 30);
      this.months = Math.floor(((this.millis / (3600000)) / 24 / 30) % 12);
      this.years = Math.floor((this.millis / (3600000)) / 24 / 365);
    }
    // plural - singular unit decision (old syntax, for backwards compatibility and English only, could be deprecated!)
    this.secondsS = (this.seconds === 1) ? '' : 's';
    this.minutesS = (this.minutes === 1) ? '' : 's';
    this.hoursS = (this.hours === 1) ? '' : 's';
    this.daysS = (this.days === 1) ? '' : 's';
    this.monthsS = (this.months === 1) ? '' : 's';
    this.yearsS = (this.years === 1) ? '' : 's';


    // new plural-singular unit decision functions (for custom units and multilingual support)
    this.secondUnit = timeUnits.seconds;
    this.minuteUnit = timeUnits.minutes;
    this.hourUnit = timeUnits.hours;
    this.dayUnit = timeUnits.days;
    this.monthUnit = timeUnits.months;
    this.yearUnit = timeUnits.years;

    // add leading zero if number is smaller than 10
    this.sseconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    this.mminutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
    this.hhours = this.hours < 10 ? `0${this.hours}` : this.hours;
    this.ddays = this.days < 10 ? `0${this.days}` : this.days;
    this.mmonths = this.months < 10 ? `0${this.months}` : this.months;
    this.yyears = this.years < 10 ? `0${this.years}` : this.years;
  }

  return (
    <Container>
      <TimerCard>
        21
      </TimerCard>
      <TimerCard>
        22
      </TimerCard>
      <TimerCard>
        23
      </TimerCard>
      <TimerCard>
        24
      </TimerCard>
    </Container>
  );
}

Timer.propTypes = {

};

export default Timer;
