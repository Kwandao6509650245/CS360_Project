module.exports = {
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
};
