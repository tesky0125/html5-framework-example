import React from 'react';
import ReactDom from 'react-dom';

import H5Framework from 'html5_framework';
console.log('html5_framework', H5Framework);

const {
  Core,
} = H5Framework;
console.log('BaseAction:', Core.BaseAction);

const action = new Core.BaseAction();

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
