import React, { Component } from 'react';
import { UpdateForm } from "./UpdateForm";
import { AuthenticationForm } from "./AuthenticationForm";
import config from "../config";
import "./index.css";
const serverRoot = config.serverRoot;

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }

    this.authenticate = this.authenticate.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  async authenticate(password) {
    let requestBody = { username: this.props.session.username, password: password }

    let response = await fetch(serverRoot + "/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .catch(err => console.error(err));

    if (response.success) {
      document.querySelector("#settings-container").style.opacity = 0;
      setTimeout(() => {
        this.setState({ authenticated: true });
        document.querySelector("#settings-container").style.opacity = 1;
      }, 600);
    } else {
      alert("Incorrect Password");
    }
  }

  async updatePassword(password) {
    let graphQLQuery = `{ "query":
      "mutation updateUser {
        updateUser(
          currentUsername:\\"${this.props.session.username}\\"
          updatedField:\\"password\\"
          newPassword:\\"${password}\\"
        ) {
          success
          message
        }
      }"
    }`;

    let response = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => response.data.updateUser)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (response.success) {
      alert("Password update success.");
    } else {
      alert("Unable to update password. " + response.message);
    }
  }

  async updateUsername(username) {
    let graphQLQuery = `{ "query":
      "mutation updateUser {
        updateUser(
          currentUsername:\\"${this.props.session.username}\\"
          updatedField:\\"username\\"
          newUsername:\\"${username}\\"
        ) {
          success
          message
        }
      }"
    }`;

    let response = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => response.data.updateUser)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (response.success) {
      alert("Username update success.");
      this.props.updateStateUsername(username);
    } else {
      alert("Unable to update username. " + response.message);
    }
  }

  async deleteAccount() {
    let graphQLQuery = `{ "query":
      "mutation deleteUser {
        deleteUser(
          userId: ${this.props.session.id}
        ) {
          success
          message
        }
      }"
    }`;

    let response = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => response.data.deleteUser)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (response.success) {
      alert("Account Deleted");
      await fetch(serverRoot + "/logout", {
        method: "DELETE",
        credentials: 'include'
      });
      window.location.href = serverRoot + "/login";
    } else {
      alert("An error occured. " + response.message);
    }
  }

  render() {
    let content = null;
    if (!this.state.authenticated) {
      content = <AuthenticationForm authenticate={this.authenticate} />
    } else {
      content = <UpdateForm
        updateUsername={this.updateUsername}
        updatePassword={this.updatePassword}
        deleteAccount={this.deleteAccount}
      />
    }

    return (
      <div id="settings-container">
        { content }
      </div>
    );
  }
}