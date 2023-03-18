const { someAsyncTask } = require('../src/some-async-task');
const { it } = require('../../../it.js');


it('should work (but will actually timeout because done is not called)', async function(done) {
    await someAsyncTask(1000);
});

it('should work', async function(done) {
    await someAsyncTask(1000, done);
});

it('should work (but will timeout because it takes too long)', async function(done) {
    await someAsyncTask(5000, done);
});

it('should work for non-async as well', function() {
    console.log('sync test log message');
});

it('should work (but will actually throw an error)', function() {
    throw Error('Failed test');
});
