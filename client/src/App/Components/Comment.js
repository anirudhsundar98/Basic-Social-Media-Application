import React, { Component } from 'react';
import "./comments.css";

export default class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <span className="user-name"> {this.props.username}: </span>
        {this.props.content} 
      </div>
    );
  }
}
