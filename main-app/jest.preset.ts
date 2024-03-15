const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.{config,dto,entity,test-data,stories,styles}.{js,jsx,ts,tsx}',
    '!**/index.{js,jsx,ts,tsx}',
    '!**/.storybook/**',
    '!**/test-utils.{js,jsx,ts,tsx}',
    '!**/__test-data__.{js,jsx,ts,tsx}',
  ],
};
