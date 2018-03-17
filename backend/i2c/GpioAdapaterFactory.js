if (process.argv[2] == 'production') {
    module.exports = new require('./GpioAdapter');
    console.log("running in " + process.argv[2] +  " mode : init GpioAdapter");

} else {
    module.exports = new require('./GpioAdapterMock');
    console.log("running in " + process.argv[2] +  " mode : init GpioAdapterMock");
}