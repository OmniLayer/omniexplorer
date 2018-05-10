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

function Timer(props) {
  const self = {
    maxTimeUnit: props.maxTimeUnit,
    datetime: props.datetime,
    countdown: props.countdown,
    interval: props.interval || 1000,
  };

  function calculateTimeUnits() {
    // timeUnits = i18nService.getTimeUnits(self.millis);
    const timeUnits = {
      seconds: 'second',
      minutes: 'minute',
      hours: 'hour',
      days: 'day',
      months: 'month',
      years: 'year',
    }; // will contains time with units

    if (self.datetime) {
      const since = (self.countdown ? moment(self.datetime) : moment());
      const to = (self.countdown ? moment() : moment(self.datetime));

      self.years = since.diff(to, 'years');
      to.add(self.years, 'years');

      self.months = since.diff(to, 'months');
      to.add(self.months, 'months');

      self.days = since.diff(to, 'days');
      to.add(self.days, 'days');

      self.hours = since.diff(to, 'hours');
      to.add(self.hours, 'hours');

      self.minutes = since.diff(to, 'minutes');
      to.add(self.hours, 'minutes');

      self.seconds = since.diff(to, 'seconds');
      to.add(self.hours, 'seconds');

      self.millis = moment.unix(self.datetime).diff(moment());
    } else {
      throw new Error('datetime prop missing on Timer call');
    }

    // plural - singular unit decision (old syntax, for backwards compatibility and English only, could be deprecated!)
    self.secondsS = (self.seconds === 1) ? '' : 's';
    self.minutesS = (self.minutes === 1) ? '' : 's';
    self.hoursS = (self.hours === 1) ? '' : 's';
    self.daysS = (self.days === 1) ? '' : 's';
    self.monthsS = (self.months === 1) ? '' : 's';
    self.yearsS = (self.years === 1) ? '' : 's';

    // new plural-singular unit decision functions (for custom units and multilingual support)
    self.secondUnit = timeUnits.seconds;
    self.minuteUnit = timeUnits.minutes;
    self.hourUnit = timeUnits.hours;
    self.dayUnit = timeUnits.days;
    self.monthUnit = timeUnits.months;
    self.yearUnit = timeUnits.years;

    // add leading zero if number is smaller than 10
    self.sseconds = self.seconds < 10 ? `0${self.seconds}` : self.seconds;
    self.mminutes = self.minutes < 10 ? `0${self.minutes}` : self.minutes;
    self.hhours = self.hours < 10 ? `0${self.hours}` : self.hours;
    self.ddays = self.days < 10 ? `0${self.days}` : self.days;
    self.mmonths = self.months < 10 ? `0${self.months}` : self.months;
    self.yyears = self.years < 10 ? `0${self.years}` : self.years;
  }

  calculateTimeUnits();

  return (
    <Container>
      {self.years > 0 &&
      <TimerCardContainer>
        <TimerCard>
          {self.yyears}
        </TimerCard>
        <TimerCardLabel>{`${self.secondUnit}${self.yearsS}`}</TimerCardLabel>
      </TimerCardContainer>
      }
      {self.months > 0 &&
      <TimerCardContainer>
        <TimerCard>
          {self.mmonths}
        </TimerCard>
        <TimerCardLabel>{`${self.monthUnit}${self.monthsS}`}</TimerCardLabel>
      </TimerCardContainer>
      }
      <TimerCardContainer>
        <TimerCard>
          {self.ddays}
        </TimerCard>
        <TimerCardLabel>{`${self.dayUnit}${self.daysS}`}</TimerCardLabel>
      </TimerCardContainer>
      <TimerCardContainer>
        <TimerCard>
          {self.hhours}
        </TimerCard>
        <TimerCardLabel>{`${self.hourUnit}${self.hoursS}`}</TimerCardLabel>
      </TimerCardContainer>
      {self.years === 0 &&
      <TimerCardContainer>
        <TimerCard>
          {self.mminutes}
        </TimerCard>
        <TimerCardLabel>{`${self.minuteUnit}${self.minutesS}`}</TimerCardLabel>
      </TimerCardContainer>
      }
      {self.months === 0 && self.years === 0 &&
      <TimerCardContainer>
        <TimerCard>
          {self.sseconds}
        </TimerCard>
        <TimerCardLabel>{`${self.secondUnit}${self.secondsS}`}</TimerCardLabel>
      </TimerCardContainer>
      }
    </Container>
  );
}

Timer.propTypes = {};

export default Timer;
