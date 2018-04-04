import { fromJS } from 'immutable';
import { selectSearchDomain } from '../selectors';

describe('selectSearchDomain', () => {
  it('Expect to have unit tests specified', () => {
    const searchState = fromJS({
      foo: 'bar',
    });
    const mockedState = fromJS({
      search: searchState,
    });
    expect(selectSearchDomain(mockedState)).toEqual(searchState);
  });
});
