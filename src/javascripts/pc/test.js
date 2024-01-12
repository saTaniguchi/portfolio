class Test {

  constructor() {
    if (Common.getName('Test')) {
      this.test();
    }
  }

  test() {
    return console.log('test');
  }



}

new Test();