import React, { Component } from 'react';
import NewPostForm from "./NewPostForm";
import SimplePost from "../Components/SimplePost";
import MorePostsButton from "./MorePostsButton";
import config from "../config";
import "./index.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      limit: 5,
      startId: -1
    };

    this.createPost = this.createPost.bind(this);
    this.fetchMorePosts = this.fetchMorePosts.bind(this);
  }

  // Get all Posts
  async fetchPosts(params, overWrite=true) {
    let graphQLQuery = `{ "query":
      "query PostsQuery {
        getAllPosts(${params}) {
          startId
          posts {
            id
            user {
              id
              username
            }
            comments {
              user {
                id
                username
              }
              content
              createdAt
            }
            content
            createdAt
          }
        }
      }"
    }`;

    let response = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => response.data.getAllPosts)
      .catch(err => {
        console.error(err);
        return null;
      });

    if (overWrite) {
      this.setState({ ...response });
    } else {
      this.setState({
        startId: response.startId,
        posts: this.state.posts.concat(response.posts)
      });
      console.log(this.state);
    }
  };

  fetchMorePosts() {
    this.fetchPosts(`limit: ${this.state.limit} endId: ${this.state.startId}`, false);
  }

  // Create a Post
  async createPost() {
    let postContent = document.querySelector("#post-content").value;
    const graphQLQuery = `{ "query":
      "mutation CreatePost {
        createPost(
          content: \\"${postContent}\\"
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
      alert("Unable to create post.");
      return;
    }

    if (response.error && response.error.message === "Unauthorized API call") {
      alert("Your session has expired. Please log back in.")
      window.location.href = config.serverRoot + "/login";
      return;
    }

    if (!response.data.createPost.success) {
      alert("Unable to create post. " + response.data.createPost.message);
      return;
    }

    // Refresh
    this.fetchPosts(`startId: ${this.state.startId}`);
    document.querySelector("#post-content").value = null;
  }

  componentDidMount() {
    this.fetchPosts(`limit: ${this.state.limit}`);
  }

  render() {
    let posts = this.state.posts.map( (post) => {
      return (
        <SimplePost
          key={post.id}
          id={post.id}
          username={post.user.username}
          content={post.content}
          createdAt={post.createdAt}
          comment={post.comments[0]}
        />
      );
    });

    return (
      <div id="main-page-container">
        <NewPostForm 
          createPost={this.createPost}
          username={this.props.session.username}
        />

        <div id="posts-container">
          {posts}
        </div>
        <MorePostsButton
          fetchMorePosts={this.fetchMorePosts}
          startId={this.state.startId}
        />
      </div>
    );
  }
}
