import React, { Component } from 'react';

class NoInputWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.formData};
  }

  render() {
    const {title} = this.state;
    console.log("NoInputField render ", this.state);
    return (
      <div>{title}</div>
    );
  }
}

export default NoInputField;