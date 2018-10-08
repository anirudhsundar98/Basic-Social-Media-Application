import React, { Component } from "react";

export default class CommentCreationForm extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      return;
    }

    this.props.createComment();
  }

  render() {
    return (
      <div id="comment-creation-container">
        <textarea id="comment-content" placeholder="Write a comment..." onKeyDown={this.handleKeyDown}></textarea>
      </div>
    );
  }
}