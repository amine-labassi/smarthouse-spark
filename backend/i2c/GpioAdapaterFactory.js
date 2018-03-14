class GpioAdapaterFactory {

    static instance(){
        if(process.env.ENV === 'prod'){
            return new require('./GpioAdapter');
        } else {
            return new require('./GpioAdapterMock');
        }
    }

}

module.exports = GpioAdapaterFactory;