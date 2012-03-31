// need to provide the name of the script file with test definition
if (phantom.args.length == 0) {
    console.log('Script file name required');
    phantom.exit(1);
}

// requiring filesystem API
var fs = require('fs');

/**
 * Assertion error.
 *
 * @param message the assertion error message
 */
function AssertionError(message) {
    this.message = message;
}

AssertionError.prototype.toString = function() {
    return 'AssertionError: ' + this.message;
};


/**
 * The test page class, essentially a wrapper of the PhantomJS WebPage.
 * Executes test function against the script under test
 * and provides evaluaton and assertion convenience methods.
 *
 * @param scriptUnderTest the script under test (e.g. an extjs component definition)
 * @param testFun testing function
 * @param waitForViewport wait for viewport to appear
 */
function TestPage(scriptUnderTest, testFun, waitForViewport) {

    // checking if the script exists
    if (!fs.exists(scriptUnderTest)) {
        console.log("File " + scriptUnderTest + " not found");
        phantom.exit(1);
    }

    var me = this;

    this.page = require('webpage').create();

    // redirecting all console messages of the page to the upper level console
    this.page.onConsoleMessage = function (msg) {
        console.log(msg);
    };

    // opening test page
    this.page.open("ExtjsTesterPage.html", function(status) {

        if (status !== 'success') {
            console.log('Error loading test page');
            phantom.exit(1);
        }

        // injecting script under test
        me.page.injectJs(scriptUnderTest);

        me.waitForExtReady(function() {
            if (waitForViewport) {
                me.waitForViewport(function() {
                    me.doTest(testFun);
                })
            } else {
                me.doTest(testFun);
            }
        });

    });
}

/**
 * Waits for ExtJS to be ready, then executes provided function
 *
 * @param fun function to execute
 */
TestPage.prototype.waitForExtReady = function(fun) {
    var me = this;
    console.log('Waiting for ExtJS to be ready...');
    var readyChecker = window.setInterval(function() {

        var isReady = me.page.evaluate(function() {
            return Ext.isReady;
        });

        if (isReady) {
            console.log('ExtJS is ready.');
            window.clearInterval(readyChecker);
            fun.call(me);
        }
    }, 100);
};

/**
 * Waits for the viewport to appear, then executes provided function
 *
 * @param fun function to extcute
 */
TestPage.prototype.waitForViewport = function(fun) {
    var me = this;
    console.log('Waiting for viewport to appear...');
    var launchedChecker = window.setInterval(function() {
        var isLaunched = me.page.evaluate(function() {
            return typeof Ext.ComponentQuery.query('viewport')[0] !== 'undefined';
        });
        if (isLaunched) {
            console.log('Viewport is ready.');
            window.clearInterval(launchedChecker);
            fun.call(me);
        }
    }, 100);
};

/**
 * Executes the test function, handling the exceptions
 * and providing PhantomJS exit code.
 *
 * @param testFun test function
 */
TestPage.prototype.doTest = function(testFun) {
    try {
        // calling the test function
        testFun.call(this);
        phantom.exit(0);
    } catch (e) {
        console.log(e);
        phantom.exit(1);
    }
};

// evaluation function that delegates to the page.evaluate method
TestPage.prototype.evaluate = function(fun) {
    return this.page.evaluate(fun);
};

// generic assertion function
TestPage.prototype.assert = function assert(test, message) {
    if (!test) {
        throw new AssertionError(message);
    }
};

/**
 * Assertion method to compare expected value with the result of
 * the evaluation function.
 *
 * @param expectedValue expected value
 * @param actualFun the function to determine the actual value, gets executed in the page context
 * @param message assertion error message
 */
TestPage.prototype.evaluateAndAssertEquals = function(expectedValue, actualFun, message) {
    this.assert(expectedValue === this.evaluate(actualFun), message);
};

/**
 * Assertion method to assert the return result of the evaluation function is strictly true
 *
 * @param actualFun evaluation function
 * @param message assertion error message
 */
TestPage.prototype.evaluateAndAssertTrue = function(actualFun, message) {
    this.evaluateAndAssertEquals(true, actualFun, message);
};

// executing the test definition
eval(fs.read(phantom.args[0]));
