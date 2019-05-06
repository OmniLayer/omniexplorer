/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const API_URL_BASE = 'https://api.omniexplorer.info/v1';
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_NOT_NUMBER = '---';
export const ECOSYSTEM_PROD = 1;
export const ECOSYSTEM_TEST = 2;
export const ECOSYSTEM_PROD_NAME = 'Production';
export const ECOSYSTEM_TEST_NAME = 'Test';
export const FIRST_BLOCK = 252317;
export const MOCKED_ACTIVATIONS = {
  "pendingactivations": [
  ],
  "completedactivations": [
    {
      "featureid": 1,
      "featurename": "Class C transaction encoding",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 5,
      "featurename": "DEx integer math update",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 7,
      "featurename": "Disable crowdsale ecosystem crossovers",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 6,
      "featurename": "Send All transactions",
      "activationblock": 395000,
      "minimumversion": 1000000
    },
    {
      "featureid": 4,
      "featurename": "Remove grant side effects",
      "activationblock": 394500,
      "minimumversion": 1000000
    },
    {
      "featureid": 2,
      "featurename": "Distributed Meta Token Exchange",
      "activationblock": 400000,
      "minimumversion": 1000000
    },
    {
      "featureid": 8,
      "featurename": "Allow trading all pairs on the Distributed Exchange",
      "activationblock": 438500,
      "minimumversion": 1100000
    },
    {
      "featureid": 14,
      "featurename": "Activate the waiting period for enabling freezing",
      "activationblock": 499200,
      "minimumversion": 30000000
    }
  ]
};
