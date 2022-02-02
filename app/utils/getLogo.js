/* eslint-disable global-require,camelcase */
import isEmpty from 'lodash/isEmpty';
import isOmniFeather from 'utils/isOmniFeather';
import isLTC from 'utils/isLTC';

export default (id, propertyinfo = {}) => {
  let logo;
  const { flags, type_int } = propertyinfo;
  const isftc = isOmniFeather;

  try {
    if (type_int === 4) {
      logo = require('images/sendall.png');
    } else if (!isEmpty(flags, true)) {
      if (flags.duplicate) {
        logo = require('images/tokenduplicate.png');
      } else if (flags.scam) {
        logo = require('images/tokenscam.png');
      } else if (flags.replaced) {
        logo = require('images/tokenreplaced.png');
      } else if (flags.registered && id) {
        if (isftc && id == 0) {
          logo = require(`images/external_logos/token${id}.png`);
        } else if (isLTC && id == 0) {
          logo = require(`images/external_logos/ltc.png`);
        } else {
          logo = require(`images/token${id}.png`);
        }
      } else if (flags.invalid && id) {
        if (isftc && id == 0) {
          logo = require(`images/external_logos/token${id}.png`);
        } else if (isLTC && id == 0) {
          logo = require(`images/external_logos/token1.png`);
        } else {
          logo = require(`images/token${id}.png`);
        }
      } else {
        logo = require('images/tokendefault.png');
      }
    } else if (isftc) {
      logo = require(`images/external_logos/ftc/token${id}.png`);
    } else if (isLTC) {
      logo = require(`images/external_logos/ltc/token${id}.png`);
    } else {
      logo = require(`images/token${id}.png`);
    }
  } catch (e) {
    if (id > 2147483650) {
      logo = require('images/test-dev-icon.png');
    } else if (flags && flags.registered) {
      logo = require('images/tokenregistered.png');
    } else {
      logo = require('images/tokendefault.png');
    }
  }
  return logo;
};
