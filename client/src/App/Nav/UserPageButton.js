import React, { Component } from 'react';
import { Redirect } from 'react-router';

export class UserPageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goToUsersPage: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ goToUsersPage: true })
  }

  render() {
    if (this.state.goToUsersPage) {
      return <Redirect push to={"/users/" + this.props.username} />;
    }

    return (
      <div className="normal-button large-button" id="user-page-button" onClick={this.handleClick}>
        Your Page
      </div>
    );
  }
}
