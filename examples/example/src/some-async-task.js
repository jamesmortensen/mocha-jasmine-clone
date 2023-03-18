// this is the code we are going to test.

async function someAsyncTask(runtimeInMillis, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done');
            if(callback) callback();
        }, runtimeInMillis);
    }).catch((err) => {});
}

module.exports = {
    someAsyncTask
};
