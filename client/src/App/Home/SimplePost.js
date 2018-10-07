import React, { Component } from 'react';

export default class SimplePost extends Component {
  render() {
    return (
      <div className="simple-post">
        <div className="post-header">
          <div className="user-name"> {this.props.username} </div>
          <div className="timestamp"> {this.props.createdAt} </div>
        </div>
        <div className="content"> {this.props.content} </div>
      </div>
    );
  }
}
