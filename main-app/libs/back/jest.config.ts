/* eslint-disable */
export default {
  displayName: 'back',
  preset: '../../jest.preset.ts',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/back',
  setupFilesAfterEnv: ['<rootDir>/test-utils/setup.ts'],
};
