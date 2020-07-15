const withTM = require('next-transpile-modules')(
    // List all of your dependencies.
    ['components']
);

module.exports = withTM();
