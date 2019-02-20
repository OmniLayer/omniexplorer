/* eslint-disable global-require */
import getTransactionHeading from 'utils/getTransactionHeading';

describe('getTransactionHeading', () => {
  const [type51, type54, typeUnknown] = [
    {
      type_int: 51,
      type: 'Create Property - Variable',
      expected: 'Create Property - Crowdsale',
    },
    {
      type_int: 54,
      type: 'Create Property - Manual',
      expected: 'Create Property - Managed',
    },
    {
      type_int: 50,
      type: 'Create Property - Unknown',
      expected: 'Create Property - Unknown',
    },
  ];

  it('should retrieve the heading for tx type 51', () => {
    expect(getTransactionHeading(type51)).toBe(type51.expected);
  });

  it('should retrieve the heading for tx type 54', () => {
    expect(getTransactionHeading(type54)).toBe(type54.expected);
  });

  it('should retrieve the heading from tx.type when type_int is unknown', () => {
    expect(getTransactionHeading(typeUnknown)).toBe(typeUnknown.expected);
  });
});
