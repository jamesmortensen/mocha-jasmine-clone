# mocha-jasmine-clone

This is a very simple clone of test frameworks [Mocha](https://github.com/mochajs/mocha) and [Jasmine](https://github.com/jasmine/jasmine). It implements the "it" method for both synchronous and asynchronous tests.

This is not intended for production use. It is missing many of the features that would be required in a good unit testing library. This is here only for learning purposes.


## See the examples

There is a demo in the example folder. There are no external dependencies, so you can outright run the sample tests directly.

```
$ git clone https://github.com/jamesmortensen/mocha-jasmine-clone.git
$ cd mocha-jasmine-clone/example
$ npm test
```

You'll then see output like this:

```
$ npm test

> mocha-jasmine-clone-example@0.0.1 test
> node test/demo.test.js

sync test log message
Test should work for non-async as well passed!
Test should work (but will actually throw an error) failed
- Error: Error: Failed test
Test should work passed!
Test should work (but will actually timeout because done is not called) failed
- Error: Timeout of 4000ms exceeded. For async tests and hooks, ensure "done()" is called!
Test should work (but will timeout because it takes too long) failed
- Error: Timeout of 4000ms exceeded. For async tests and hooks, ensure "done()" is called!
```

There's a specific test to show what happens when the test times out, but some async function within the test continues to execute:

```
$ node test/gap-timeout-env.test.js
```

There is also a separate `example-with-mocha` of the same tests run with Mocha, to see the differences in how the tests behave.

## License

Copyright (c) James Mortensen, 2023 MIT License
