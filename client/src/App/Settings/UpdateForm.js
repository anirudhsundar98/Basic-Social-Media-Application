import React, { Component } from 'react';

export class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async updateUsername() {
    let newUsername = document.querySelector("#new-username").value;
    await this.props.updateUsername(newUsername);
    document.querySelector("#new-username").value = "";
  }

  async updatePassword() {
    let newPassword = document.querySelector("#new-password").value;
    await this.props.updatePassword(newPassword);
    document.querySelector("#new-password").value = "";
  }

  render() {
    return (
      <React.Fragment>
        <h2 id="settings-title">Account Update</h2>
        <div className="update-form-container">
          <input id="new-username" placeholder="Enter a new username" value={this.props.username} />
          <div className="normal-button update-form-button" id="update-username-button" onClick={this.updateUsername}>
            Update Username
          </div>
        </div>
        <div className="update-form-container">
          <input id="new-password" type="password" placeholder="Enter a new password" />
          <div className="normal-button update-form-button" id="update-password-button" onClick={this.updatePassword}>
            Update Password
          </div>
        </div>
        <div className="update-form-container">
          <div className="large-button update-form-button" id="delete-account-button" onClick={this.props.deleteAccount}>
            Delete Account
          </div>
        </div>
      </React.Fragment>
    )
  }
}
