import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./comments.css";

export default class Comment extends Component {
  render() {
    let usernameSpan = (window.location.pathname === `/users/${this.props.username}`)
      ? <span className="user-name"> {this.props.username}: </span>
      : <span className="user-name user-name-linked"> <Link to={"/users/" + this.props.username}> {this.props.username}</Link>: </span>
    ;

    return (
      <div className="comment">
        { usernameSpan }
        {this.props.content}
      </div>
    );
  }
}
