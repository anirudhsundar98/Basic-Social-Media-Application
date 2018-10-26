import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./post-head.css";

export default class PostHead extends Component {
  render() {
    let usernameDiv = (window.location.pathname === `/users/${escape(this.props.username)}`)
      ? <div className="user-name"> {this.props.username} </div>
      : <div className="user-name user-name-linked"> <Link to={"/users/" + this.props.username}> {this.props.username} </Link></div>
    ;

    return (
      <React.Fragment>
        <div className="post-header">
          { usernameDiv }
          <div className="timestamp"> {this.props.createdAt} </div>
        </div>
        <div className="content"> {this.props.content} </div>
      </React.Fragment>
    );
  }
}
