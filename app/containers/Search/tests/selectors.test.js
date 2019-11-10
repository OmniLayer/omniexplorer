import { selectSearchDomain } from '../selectors';

describe('selectSearchDomain', () => {
  it('Expect to have unit tests specified', () => {
    const searchState = {
      foo: 'bar',
    };
    const mockedState = {
      search: searchState,
    };
    expect(selectSearchDomain(mockedState)).toEqual(searchState);
  });
});
