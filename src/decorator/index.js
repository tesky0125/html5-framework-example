import React from 'react';
import ReactDom from 'react-dom';

import DemoWithPrivateDecorator from './DemoWithPrivateDecorator';
import './DemoWithDecorator';

import assert from 'assert';
import _ from 'lodash';

import autobind from '../src/decorators/autobind';
import debounce from '../src/decorators/debounce';

import {
  autobind,
  debounce
} from 'core-decorators';

export default class DecoratorComponent extends React.Component {
  constructor() {
    super();

    // this['onClickTestDecorator'] = this['onClickTestDecorator'].bind(this);
    // this['onClickTestDecorator'] = _.debounce(this['onClickTestDecorator'], 5000);

    this.state = {};
  }
  componentWillMount() {
    this.testDemoWithPrivateDecorator();
    this.testDemoWithDecorator();
  }

  // @autobind
  // @debounce(2000)
  @autobind
  @debounce(2000)
  onClickTestDecorator() {
    console.log('hello decorator success, timeout 2 seconds!@@!');
  }

  testDemoWithPrivateDecorator() {
    const instance = new DemoWithPrivateDecorator();
    assert.equal(instance.public1('hello'), 'public1:hello');
    assert(!('private2' in instance));

    console.log(instance.public1('hello'));
  }

  testDemoWithDecorator() {

  }

  render() {
    console.log('Hello World!');
    return (
      <div>
        <div  onClick = {this.onClickTestDecorator}>Hello World!!React Hot Loader Success!!! </div>
      </div>);
  }
}


// ReactDom.render(
//   <DecoratorComponent/>,
//   document.getElementById('app')
// );
