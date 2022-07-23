/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>', './src'],
  modulePaths: ['<rootDir>', './src/**/*'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  transformIgnorePatterns: ['node_modules/(?!(svelte-spa-router|svelte-i18n)/)'],
  setupFiles: ['./src/__mocks__/config.ts'], // mask import.meta behind a mock (it's not well supported)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // resolve '@/' to 'src/' as tsconfig does
  },
}
