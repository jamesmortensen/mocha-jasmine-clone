// timeout-env.test.js

// this must happen before loading the 'it' module.
const TIMEOUT = 10000;
process.env.TIMEOUT = TIMEOUT;

const { someAsyncTask } = require('../src/some-async-task');
const { it } = require('../../../it.js');


it('should work (but will timeout because it takes 1000ms longer than the ENV TIMEOUT)', async function(done) {
    await someAsyncTask(TIMEOUT + 1000, done);
});
