// jest.config.js
module.exports = {
  projects: [
    {
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json',
        },
      },
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/api/**/*.test.ts'], // API tests
    },
    {
      displayName: 'jsdom',
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json',
        },
      },
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/tests/components/**/*.test.tsx'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      moduleNameMapper: {
        // ✅ Combine both mappings here
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1',
      },
    },
  ],
};
