module.exports = {
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    globalTeardown: '<rootDir>/src/__test__/teardown.js'
};
