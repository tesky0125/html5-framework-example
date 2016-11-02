import React from 'react';
import ReactDom from 'react-dom';

import H5Framework from 'html5_framework';
console.log('html5_framework', H5Framework);

const {
  BaseAction,
} = H5Framework;
console.log('BaseAction:', BaseAction);
const action = new H5Framework.BaseAction();

import HelloWorldComponent from './demo/index';
// import DecoratorComponent from './decorator/index';

ReactDom.render(
  <HelloWorldComponent/>,
  document.getElementById('app')
);

// ReactDom.render(
//   <DecoratorComponent/>,
//   document.getElementById('app')
// );
