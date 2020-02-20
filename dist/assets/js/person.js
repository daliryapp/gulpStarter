class Person {
  constructor(name) {
    this._name = name;
  }
  sayHello() {
    return `Hello hi , ${this._name}`;
  }
}

export default Person;