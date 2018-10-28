import React, { Component } from 'react';

export class AuthenticationForm extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }

    let passwordInput = document.querySelector("#password-verification").value;
    this.props.authenticate(passwordInput);
  }

  render() {
    return (
      <React.Fragment>
        <h2 id="settings-title">Account Update</h2>
        <input name="password" type="password" id="password-verification" placeholder="Please enter your current password" onKeyDown={this.handleKeyDown} />
      </React.Fragment>
    )
  }
}
