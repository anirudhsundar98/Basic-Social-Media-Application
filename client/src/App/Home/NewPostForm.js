import React, { Component } from 'react';

export default class NewPostForm extends Component {
  render() {
    return (
      <div id="post-creation-container">
        <textarea id="post-content" placeholder="What's on your mind?"></textarea> <br />
        <div className="normal-button" id="create-post-button" onClick={this.props.createPost}>Create Post</div>
      </div>
    );
  }
}