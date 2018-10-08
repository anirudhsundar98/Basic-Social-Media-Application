import React, { Component } from 'react';
import "./post-head.css";

export default class PostHead extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="post-header">
          <div className="user-name"> {this.props.username} </div>
          <div className="timestamp"> {this.props.createdAt} </div>
        </div>
        <div className="content"> {this.props.content} </div>
      </React.Fragment>
    );
  }
}
