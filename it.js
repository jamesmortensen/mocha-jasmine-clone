// it.js

const TIMEOUT = process.env.TIMEOUT || 4000;

// this is sort of what Mocha's "it" function might look like
function it(title, testCaseFn) {
    let isDone = false;
    let isTimedOut = false;
    let isError = false;
    const testcase = {};

    // executes test case function
    try {
        testCaseFn(done);
    } catch (err) {
        console.error('Test '+ title +' failed');
        console.error('- Error: '+ err);
        isError = true;
        process.exitCode = 1;
    }


    // this is kind of like what "Mocha" is doing. It is only giving the 
    // "testcase" 4 seconds to complete. If it doesn't complete in 4 seconds, 
    // it stops the execution and theows the "Timeout” error.
    if (isAsyncFunction(testCaseFn))
        testcase.timeoutCode = setTimeout(() => {
            if (!isDone) {
                isTimedOut = true;
                isError = true;
                console.error('Test ' + title + ' failed');
                console.error('- Error: Timeout of ' + TIMEOUT + 'ms exceeded. For async tests and hooks, ensure \"done()\" is called!');
                process.exitCode = 1;
                
                // with this uncommented, we throw and then all tests stop, including the test run,
                // but with it commented, we can run other tests, but the test that times out will
                // still continue executing. The "describe" wrapper can help catch these and continue
                // execution.
                //throw new Error('- Error: Timeout of ' + TIMEOUT + 'ms exceeded. For async tests and hooks, ensure \"done()\" is called!');
            }
        }, TIMEOUT);
    else
        done();

    function done() {
        if (isTimedOut)
            return;
        isDone = true;
        clearTimeout(testcase.timeoutCode);
        if(!isError && !isTimedOut)
            console.log('Test ' + title + ' passed!')
    }

    function isAsyncFunction(testCaseFn) {
        return testCaseFn.toString().match('^async function\\(') !== null;
    }
}


module.exports = {
    it
}
