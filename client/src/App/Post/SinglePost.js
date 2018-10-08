import React, { Component } from 'react';
import CommentCreationForm from "./CommentCreationForm";
import PostHead from "../Components/PostHead";
import Comment from "../Components/Comment";

export default class SinglePost extends Component {
  render() {
    let username = (this.props.post.user) ? this.props.post.user.username : null ;
    let comments = (this.props.post.comments)
      ? this.props.post.comments.map( comment => {
        return <Comment
          key={comment.id}
          username={comment.user.username}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      })
      : [];

    return (
      <div className="single-post">
        <PostHead
          username={ username }
          content={this.props.post.content}
          createdAt={this.props.post.createdAt}
        />
        { comments }
        <CommentCreationForm
          createComment={this.props.createComment}
        />
      </div>
    );
  }
}
