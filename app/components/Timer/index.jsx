/**
 *
 * Timer
 *
 */

import React from 'react';
import styled from 'styled-components';
import moment from 'moment/src/moment';

import TimerCard from './TimerCard';

const Container = styled.div.attrs({
  className: 'timer',
})`
`;

const TimerCardContainer = styled.div.attrs({
  className: 'timer-card-container d-inline-block',
})`
  :not(:first-child) {
      margin-left: 3px;
    }
`;

const TimerCardLabel = styled.p.attrs({
  className: 'text-uppercase text-light',
})`
`;


export class Timer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      lastupdate: moment().unix(),
    };

    this.calculateTimeUnits();
    this.idInterval = setInterval(
      () => {
        this.calculateTimeUnits.call(this);
        this.setState({ lastupdate: moment().unix() });
      },
      this.props.interval,
    );
  }

  componentWillUnmount(){
    clearInterval(this.idInterval);
  }

  calculateTimeUnits() {
    const timeUnits = {
      seconds: 'second',
      minutes: 'minute',
      hours: 'hour',
      days: 'day',
      months: 'month',
      years: 'year',
    }; // will contains time with units

    if (this.props.datetime) {
      const since = (this.props.countdown ? moment.utc(this.props.datetime) : moment.utc());
      const to = (this.props.countdown ? moment.utc() : moment.utc(this.props.datetime));

      this.years = since.diff(to, 'years');
      to.add(this.years, 'years');

      this.months = since.diff(to, 'months');
      to.add(this.months, 'months');

      this.days = since.diff(to, 'days');
      to.add(this.days, 'days');

      this.hours = since.diff(to, 'hours');
      to.add(this.hours, 'hours');

      this.minutes = since.diff(to, 'minutes');
      to.add(this.hours, 'minutes');

      this.seconds = since.diff(to, 'seconds');
      to.add(this.hours, 'seconds');

      this.millis = moment.unix(this.props.datetime).utc().diff(moment.utc());
    } else {
      throw new Error('datetime prop missing on Timer call');
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

    if (this.years > 99) {
      this.sseconds = '**';
      this.mminutes = '**';
      this.hhours = '**';
      this.ddays = '**';
      this.mmonths = '**';
      this.yyears = '**';
    } else {
      // add leading zero if number is smaller than 10
      this.sseconds = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
      this.mminutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
      this.hhours = this.hours < 10 ? `0${this.hours}` : this.hours;
      this.ddays = this.days < 10 ? `0${this.days}` : this.days;
      this.mmonths = this.months < 10 ? `0${this.months}` : this.months;
      this.yyears = this.years < 10 ? `0${this.years}` : this.years;
    }
  }

  render() {
    return (
      <Container>
        {this.years > 0 &&
        <TimerCardContainer>
          <TimerCard>
            {this.yyears}
          </TimerCard>
          <TimerCardLabel>{`${this.yearUnit}${this.yearsS}`}</TimerCardLabel>
        </TimerCardContainer>
        }
        {(this.years > 0 || this.mmonths > 0) &&
        <TimerCardContainer>
          <TimerCard>
            {this.mmonths}
          </TimerCard>
          <TimerCardLabel>{`${this.monthUnit}${this.monthsS}`}</TimerCardLabel>
        </TimerCardContainer>
        }
        <TimerCardContainer>
          <TimerCard>
            {this.ddays}
          </TimerCard>
          <TimerCardLabel>{`${this.dayUnit}${this.daysS}`}</TimerCardLabel>
        </TimerCardContainer>
        <TimerCardContainer>
          <TimerCard>
            {this.hhours}
          </TimerCard>
          <TimerCardLabel>{`${this.hourUnit}${this.hoursS}`}</TimerCardLabel>
        </TimerCardContainer>
        {this.years === 0 &&
        <TimerCardContainer>
          <TimerCard>
            {this.mminutes}
          </TimerCard>
          <TimerCardLabel>{`${this.minuteUnit}${this.minutesS}`}</TimerCardLabel>
        </TimerCardContainer>
        }
      </Container>
    );
  }
}

Timer.propTypes = {};

export default Timer;
