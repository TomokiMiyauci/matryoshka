module.exports = {
  roots: ['<rootDir>/test'],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '<rootDir>/test/setup/composition-api.ts',
    '<rootDir>/test/setup/vuetify.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '.firebase',
    '<rootDir>/test/unit/snapshot.spec.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^.+\\.(css|less)$': '<rootDir>/node_modules/jest-transform-stub'
  },
  modulePathIgnorePatterns: ['<rootDir>/.firebase'],
  moduleFileExtensions: ['js', 'vue', 'ts', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/functions/**/*.ts',
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ]
}
