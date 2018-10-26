import React, { Component } from 'react';
import { Redirect } from 'react-router';

export class SettingsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToSettings: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ goToSettings: true })
  }

  render() {
    if (this.state.goToSettings) {
      return <Redirect push to={"/settings"} />;
    }

    return (
      <div className="normal-button large-button" id="main-page-button" onClick={this.handleClick}>
        Settings
      </div>
    );
  }
}