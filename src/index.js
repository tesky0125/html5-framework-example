import React from 'react';
import ReactDom from 'react-dom';

import Core from 'core';
console.log('html5_framework core', Core);

import Components from 'components';
console.log('html5_framework components', Components);

const {
  BaseAction,
} = Components;
console.log('BaseAction:', BaseAction);
const action = new Components.BaseAction();

// import HelloWorldComponent from './demo/index';
import DecoratorComponent from './decorator/index';

// ReactDom.render(
//   <HelloWorldComponent/>,
//   document.getElementById('app')
// );

ReactDom.render(
  <DecoratorComponent/>,
  document.getElementById('app')
);
