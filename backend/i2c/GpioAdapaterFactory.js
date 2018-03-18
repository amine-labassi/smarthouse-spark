if (process.env.NODE_ENV === 'production') {
    module.exports = new require('./GpioAdapter');
    console.log("running in " + process.env.NODE_ENV +  " mode : init GpioAdapter");

} else {
    module.exports = new require('./GpioAdapterMock');
    console.log("running in " + process.env.NODE_ENV +  " mode : init GpioAdapterMock");
}