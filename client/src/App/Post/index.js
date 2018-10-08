import React, { Component } from 'react';
import { Redirect } from 'react-router';
import SinglePost from "./SinglePost";
import "./index.css";

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: window.location.pathname.split("/")[2]  // Nice comfy hard coded id
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

    if (response === null || !response.data.createComment.success) {
      console.log(response);
      alert("Unable to create comment. " + ((response) ? response.message : null));
    }

    // Refresh
    this.fetchPost();
    document.querySelector("#comment-content").value = null;
  }

  async componentDidMount() {
    this.fetchPost();
  }

  render() {
    if (this.state.return) {
      return <Redirect push to={"/"} />;
    }

    // let post = 

    return (
      <SinglePost
        post={this.state.post}
        createComment={this.createComment}
      />
    );
  }
}
