/* eslint-disable global-require */
import getLogo from '../getLogo';

describe('getLogo', () => {
  const [normalLogoId, testDevLogoId, defaultLogo] = [
    0,
    2147483651,
    2147483650,
  ];

  it('should retrieve the logo of the given token', () => {
    const logo = require(`images/token${normalLogoId}.png`);
    expect(getLogo(normalLogoId)).toBe(logo);
  });

  it('should retrieve the warning logo if has flag `duplicate`', () => {
    const flags = { duplicate: true };
    const logo = require('images/tokenwarn.png');
    expect(getLogo(normalLogoId, flags)).toBe(logo);
  });

  it('should retrieve the warning logo if has flag `scam`', () => {
    const flags = { scam: true };
    const logo = require('images/tokenwarn.png');
    expect(getLogo(normalLogoId, flags)).toBe(logo);
  });

  it('should retrieve the dev-test logo if the id is greater than 2147483650', () => {
    const logo = require('images/test-dev-icon.png');
    expect(getLogo(testDevLogoId)).toBe(logo);
  });

  it(`should retrieve the default logo if it's not exists`, () => {
    const logo = require('images/tokendefault.png');
    expect(getLogo(defaultLogo)).toBe(logo);
  });
});
