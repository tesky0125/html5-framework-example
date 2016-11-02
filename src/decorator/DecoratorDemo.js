// example 1
@annotation
class MyClass1 {}

function annotation(target) {
  // console.log('Class', target);
  target.annotated = true;
}

console.log('example 1, annotated:', MyClass1.annotated);

// example 2
@isTestable(true)
class MyClass2 {}

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  }
}

console.log('example 2, isTestable:', MyClass2.isTestable);

// example 3
class MyClass3 {
  @enumerable(false)
  method() {
    console.warn('example 3, hello world!');
  }
  @enumerable(true)
  method2() {
    console.warn('example 3, hello world!');
  }
}

function enumerable(value) {
  return function(target, key, descriptor) {
    console.log(target, key, descriptor);
    target[key]();
    descriptor.enumerable = value;
    return descriptor;
  }
}

const instance3 = new MyClass3();
for (let key in instance3) {
  console.log('example 3, for-in-enumerable: ', key);
}

// example 4
import _ from 'lodash';
// import debounce from '../src/decorators/debounce';
import {
  debounce
} from 'core-decorators';

class MyClass4 {
  constructor() {
    // replace below with @debounced
    // this.method = _.debounce(this.method, 5000);
  }

  @debounce(3000)
  method() {
    console.warn('example 4, hello world, timeout 3 seconds!!');
  }

  print() {
    // console.log(this.method);
    this.method();
  }
}

const instance4 = new MyClass4();
instance4.print();
