import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PostHead from "../Components/PostHead";
import Comment from "../Components/Comment";

export default class SimplePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postClicked: false
    };

    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({ postClicked: true });
  }

  render() {
    // Handle post click
    if (this.state.postClicked) {
      return <Redirect push to={"/posts/" + this.props.id} />;

      // The post can be passed on as below. This isnt done for this app.
      /* return <Redirect push to={{
        pathname: "/posts/" + this.props.id,
        post: {
          id: this.props.id,
          username: this.props.username,
          content: this.props.content,
          createdAt: this.props.createdAt
        }
      }} />; */
    }

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
      <div className="simple-post" onClick={this.redirect}>
        <PostHead
          username={this.props.username}
          content={this.props.content}
          createdAt={this.props.createdAt}
        />
        { CommentElement }
      </div>
    );
  }
}
