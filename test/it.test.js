// it.test.js

// this contains tests for the it.js module. The module is testing itself!
const { it } = require('../it.js');



it('should pass tests because it finishes within the 4000ms timeout at 1000ms', async function (passTest) {
    let pass = false;
    function cb() {
        pass = true;
    }
    await someAsyncTask(1000, cb);
    if (!pass)
        throw new Error('Test Fails');
    else
        passTest();
});

it('should pass tests because it finishes within the 4000ms timeout at 3999ms', async function (passTest) {
    let pass = false;
    function cb() {
        pass = true;
    }
    await someAsyncTask(3999, cb);
    if (!pass)
        throw new Error('Test Fails');
    else
        passTest();
});

// because the timeout throws inside an internal timer, we cannot catch it here.
// the only way I know to test timeouts is to load this within another node.js 
// process and then examine stdout for the correct error message.
// also, because it throws, all other tests stop executing. Mocha likely catches
// all of these timeouts globally so that it can manage them and continue running tests.
it('should fail tests because it does not complete within the 4000ms timeout with 4001ms runtime', async function (done) {
    const passNegativeTestCase = done;
    let pass = true;
    function cb() {
        pass = false;
    }
    try {
        await someAsyncTask(4001, cb);
    } catch (e) {
        passNegativeTestCase();
    }
    if (!pass)
        throw new Error('Test Fails');
});

// because the previous test failed, this one will not execute, unless the throw in the 
// it.js setTimeout is commented out.
it('should fail tests because it does not complete within the 4000ms timeout with 5000ms runtime', async function (done) {
    const passNegativeTestCase = done;
    let pass = true;
    function cb() {
        pass = false;
    }
    try {
        await someAsyncTask(5000, cb);
    } catch (e) {
        passNegativeTestCase();
    }
    if (!pass)
        throw new Error('Test Fails');
});

it('should throw an error', function () {
    let pass = false;
    try {
        throw Error('Failed test');
    } catch (e) {
        pass = true;
    }
    if (!pass) throw new Error('Test Fails');
});

async function someAsyncTask(runtimeInMillis, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done');
            if (callback) callback();
        }, runtimeInMillis);
    }).catch((err) => { });
}
