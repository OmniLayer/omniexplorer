/*
 * CrowdsaleDetail Messages
 *
 * This contains all the text for the CrowdsaleDetail component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  divisible: {
    id: 'app.containers.CrowdsaleDetail.divisible',
    defaultMessage:
      'This token is Divisible, it can be held/sent/received in fractional amounts eg 0.21, 23.5,..,32.3, etc..',
  },
  indivisible: {
    id: 'app.containers.CrowdsaleDetail.divisible',
    defaultMessage:
      'This token is Indivisible, it can only be sent/received/held in whole amounts: eg 1,2,3,4,...,99',
  },
});
