module.exports = {
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup/vue.ts',
    '<rootDir>/test/setup/composition-api.ts',
    '<rootDir>/test/setup/vuetify.ts',
    '<rootDir>/test/setup/context.ts'
  ],
  testPathIgnorePatterns: ['/node_modules/', '.firebase'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^.+\\.(css|less)$': '<rootDir>/node_modules/jest-transform-stub'
  },
  modulePathIgnorePatterns: ['<rootDir>/.firebase'],
  moduleFileExtensions: ['js', 'vue', 'ts', 'json'],
  transform: {
    '^.+\\.stories\\.(js|ts)$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ]
}
