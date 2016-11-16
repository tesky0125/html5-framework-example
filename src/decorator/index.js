import React from 'react';
import ReactDom from 'react-dom';

import PrivateDecoratorClass from './PrivateDecoratorClass';
import './DecoratorDemo';

import assert from 'assert';
import _ from 'lodash';

import {
  autobind,
  debounce,
} from 'core-decorators';

export default class DecoratorComponent extends React.Component {
  constructor() {
    super();

    this['onClickTestDecorator'] = this['onClickTestDecorator'].bind(this);
    // this['onClickTestDecorator'] = _.debounce(this['onClickTestDecorator'], 5000);

    this.state = {};
  }

  componentWillMount() {
    this.testPrivateDecoratorClass();
  }

  // @autobind
  // @debounce(2000)
  // @autobind
  @debounce(2000)
  onClickTestDecorator() {
    console.log('hello decorator success, timeout 2 seconds!@@!');
  }

  testPrivateDecoratorClass() {
    const instance = new PrivateDecoratorClass();
    assert.equal(instance.public1('hello'), 'example public1:hello');
    assert(!('private2' in instance));

    console.log(instance.public1('hello'));
  }


  render() {
    console.log('Hello World DecoratorComponent!');
    return (
      <div>
        <div  onClick = {this.onClickTestDecorator}>Hello World DecoratorComponent! </div>
      </div>);
  }
}
