class WindowsManager {

  constructor(){
    this.gpioAdapter = GpioAdapaterFactory.instance();
  }

  sayHello(){
    this.gpioAdapter.getState();
    return 'hello';
  }
}

module.exports = new WindowsManager();
