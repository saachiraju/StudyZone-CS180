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
  
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.testconfig.js' }],
      },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        // Handle CSS imports (optional)
        '\\.(less|scss|sass)$': 'identity-obj-proxy',
        '\\.css$': '<rootDir>/styleMock.js',
        // Handle image imports (optional)
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        // Optional if using @/aliases
        '^@/(.*)$': '<rootDir>/$1',
      },
};
  