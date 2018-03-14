class WindowsManager {

  constructor(){
    this.gpioAdapter = require('../i2c/GpioAdapaterFactory');
  }

  sayHello(){
    this.gpioAdapter.getState();
    return 'hello';
  }
}

module.exports = new WindowsManager();
