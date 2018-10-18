import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PostHead from "./PostHead";
import Comment from "./Comment";
import "./simple-post.css";

export default class SimplePost extends Component {
  render() {
    // Check if post has any comments
    let comment = this.props.comment;
    let CommentElement = (comment)
      ? <Comment
        username={comment.user.username}
        content={comment.content}
        createdAt={comment.createdAt}
      />
      : null;

    return (
      <div className="simple-post">
        <PostHead
          username={this.props.username}
          content={this.props.content}
          createdAt={this.props.createdAt}
          noUserLink={this.props.noUserLink}
        />
        { CommentElement }
        <div className="full-post-link"><Link to={"/posts/" + this.props.id}>Read Full Post...</Link></div>
        {/* The link element can be used to pass post props to save load time. This isnt done here. */}
      </div>
    );
  }
}
