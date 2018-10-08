import React, { Component } from 'react';
import { Redirect } from 'react-router';

export class MainPageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goHome: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ goHome: true })
  }

  render() {
    if (this.state.goHome) {
      return <Redirect push to={"/"} />;
    }

    return (
      <div className="normal-button nav-button" id="main-page-button" onClick={this.handleClick}>
        Main Page
      </div>
    );
  }
}