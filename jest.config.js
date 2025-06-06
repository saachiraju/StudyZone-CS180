// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // moduleNameMapper: {
    //   // Handle CSS imports (optional)
    //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    //   // Handle image imports (optional)
    //   '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    //   // Optional if using @/aliases
    //   '^@/(.*)$': '<rootDir>/$1',
    // },
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   };

// module.exports = {
//   project: [
//     {
//       preset: 'ts-jest',
//       globals: {
//         'ts-jest': {
//           tsconfig: 'tsconfig.test.json',
//         },
//       },
//       testEnvironment: 'node',
//       testMatch: ['<rootDir>/tests/api/**/*.test.ts'], // API tests
//     },

  
//   {
//     testEnvironment: 'jsdom',
//     transform: {
//         '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.testconfig.js' }],
//       },
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//     moduleNameMapper: {
//         // Handle CSS imports (optional)
//         '\\.(less|scss|sass)$': 'identity-obj-proxy',
//         '\\.css$': '<rootDir>/styleMock.js',
//         // Handle image imports (optional)
//         '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//         // Optional if using @/aliases
//         '^@/(.*)$': '<rootDir>/$1',
//       },
//     }
//   ]
// };


// jest.config.js
//module.exports = {
//  projects: [
//    {
//      preset: 'ts-jest',
//      globals: {
//        'ts-jest': {
//          tsconfig: 'tsconfig.test.json',
//        },
 //     },
//      testEnvironment: 'node',
//      testMatch: ['<rootDir>/tests/api/**/*.test.ts'], // API tests
//    },
//    {
//      displayName: 'jsdom',
//      preset: 'ts-jest',
//      globals: {
//        'ts-jest': {
//         tsconfig: 'tsconfig.test.json',
//      },
//      },
//      testEnvironment: 'jsdom',
//     testMatch: ['<rootDir>/tests/components/**/*.test.tsx'],
//      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//      transform: {
//        '^.+\\.tsx?$': 'ts-jest',
//      },
//      moduleNameMapper: {
//        // ✅ Combine both mappings here
//        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//        '^@/(.*)$': '<rootDir>/$1',
//      },
//    },
//  ],
//};

// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'api-tests',
      preset: 'ts-jest',
      testEnvironment: 'node',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json',
        },
      },
      testMatch: ['<rootDir>/tests/api/**/*.test.ts'],
    },
    {
      displayName: 'component-tests',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.test.json',
        },
      },
      testMatch: ['<rootDir>/tests/components/**/*.test.tsx'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/$1',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    },
  ],
};
