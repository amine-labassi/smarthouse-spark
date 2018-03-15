const assert = require('chai').assert;
const gpioAdapater = require('./GpioAdapter');

describe('Manage GPIO', () => {
    describe('Manage states', () => {
        it('set up sate', () => {
            assert.equal(gpioAdapater.setState(), 'hello');
        })
    })
});