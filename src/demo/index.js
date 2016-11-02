import React from 'react';
import ReactDom from 'react-dom';

export default class HelloWorldComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log('Hello html5-framework-example!');
    return (
      <div> Hello html5-framework-example! </div>
    );
  }
}
