const baseConfig = require('./jest.config')

module.exports = {
  ...baseConfig,

  setupFilesAfterEnv: [
    '<rootDir>/test/setup/vue.ts',
    '<rootDir>/test/setup/composition-api.ts',
    '<rootDir>/test/setup/vuetify.ts',
    '<rootDir>/test/setup/context.ts'
  ],
  testMatch: ['<rootDir>/test/unit/snapshot.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.stories\\.(js|ts)$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub'
  },
  collectCoverage: false
}
