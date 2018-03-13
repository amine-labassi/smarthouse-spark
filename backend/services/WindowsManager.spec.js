/**
 * Created by amine on 13/03/2018.
 */
const WindowsManager = require('./WindowsManager');
const assert = require('chai').assert;

describe('User module', () => {
    describe('"up"', () => {
        it('should export a function', (done) => {
            assert.equal(WindowsManager.sayHello(), 'hello', 'foo equal `bar`');
            done();
        })
    })
})