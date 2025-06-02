// jest.config.js
module.exports = {
    projects: [
      {
        preset: 'ts-jest',
        globals: {
            'ts-jest': {
              tsconfig: 'tsconfig.test.json'
            }
          },
        testEnvironment: 'node',
        testMatch: ['<rootDir>/tests/api/**/*.test.ts'], // adjust to your API test paths
      },
      {
        displayName: 'jsdom',
        preset: 'ts-jest',
        globals: {
            'ts-jest': {
              tsconfig: 'tsconfig.test.json'
            }
          },
        testEnvironment: 'jsdom',
        testMatch: ['<rootDir>/tests/components/**/*.test.tsx'], // adjust to your component test paths
        setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // optional, for React Testing Library setup
        transform: {
            '^.+\\.tsx?$': 'ts-jest',
        },
        moduleNameMapper: {
            '^@/(.*)$': '<rootDir>/$1',
          },
      },
    ],
  };
  