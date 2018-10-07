import React, { Component } from 'react';
import config from "../config";
const serverRoot = config.serverRoot;

export class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    await fetch(serverRoot + "/logout", {
      method: "DELETE",
      credentials: 'include'
    });

    window.location.href = serverRoot + "/login";
  }

  render() {
    return (
      <div id="logout-button" onClick={this.logout}>Logout</div>
    );
  }
}