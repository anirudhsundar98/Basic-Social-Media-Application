import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SinglePost from "./SinglePost";
import config from "../config";
import "./index.css";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: this.props.match.params.id
      },
      return: false
    };

    this.createComment = this.createComment.bind(this);
  }

  // Get all Posts
  async fetchPost() {
    let graphQLQuery = `{ "query":
      "query SinglePostQuery {
        getPost(id: ${this.state.post.id}) {
          id
          user {
            id
            username
          }
          content
          createdAt
          comments {
            id
            user {
              id
              username
            }
            content
            createdAt
          }
        }
      }"
    }`;

    let post = await this.props.sendGraphQLQuery(graphQLQuery)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (post.errors) {
      alert(post.errors[0].message);
      this.setState( {return: true} );
      return;
    }

    post = post.data.getPost;
    this.setState({ post });
  };

  // Create a Comment
  async createComment() {
    let commentContent = document.querySelector("#comment-content").value;
    const graphQLQuery = `{ "query":
      "mutation CreateComment {
        createComment(
          postId: ${this.state.post.id}
          content: \\"${commentContent}\\"
        ) {
          success
          message
        }
      }"
    }`;

    let response = await this.props.sendGraphQLQuery(graphQLQuery)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (response === null) {
      alert("Unable to create comment.");
      return;
    }

    if (response.error && response.error.message === "Unauthorized API call") {
      alert("Your session has expired. Please log back in.")
      window.location.href = config.serverRoot + "/login";
      return;
    }

    if (!response.data.createComment.success) {
      alert("Unable to create comment. " + response.message);
      return;
    }

    // Refresh
    this.fetchPost();
    document.querySelector("#comment-content").value = null;
  }

  async componentDidMount() {
    this.props.checkSession();
    this.fetchPost();
  }

  render() {
    if (this.state.return) {
      return <Redirect push to={"/"} />;
    }

    return (
      <SinglePost
        post={this.state.post}
        createComment={this.createComment}
      />
    );
  }
}
