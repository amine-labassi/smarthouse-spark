if(process.env.ENV === 'prod'){
    module.exports = new require('./GpioAdapter');
} else {
    module.exports  = new require('./GpioAdapterMock');
}