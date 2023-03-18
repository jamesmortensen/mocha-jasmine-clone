// timeout-env.test.js

const { someAsyncTask } = require('../src/some-async-task');
const { it } = require('../../../it.js');


// observe that even though it times out at 4000ms, it still takes the full 8000ms for the 
// test to exit. 
it('should work (but will timeout because it takes 4000ms longer than the 4000ms ENV TIMEOUT)', async function(done) {
    await someAsyncTask(8000, done);
});
