if (process.env.NODE_ENV != 'production') {
    module.exports = new require('./GpioAdapter');
} else {
    module.exports = new require('./GpioAdapterMock');
}