import React, { Component } from 'react';
import NewPostForm from "./NewPostForm";
import SimplePost from "./SimplePost";
import "./index.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

    this.createPost = this.createPost.bind(this);
  }

  // Get all Posts
  async fetchPosts() {
    let graphQLQuery = `{ "query":
      "query PostsQuery {
        getAllPosts {
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
      }"
    }`;

    let posts = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => ([...response.data.getAllPosts]))
      .catch(err => {
        console.error(err);
        return null;
      });

    this.setState({ posts });
  };

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

    if (response === null || !response.data.createPost.success) {
      alert("Unable to create post. " + ((response) ? response.message : null));
    }

    // Refresh
    this.fetchPosts();
    document.querySelector("#post-content").value = null;
  }

  componentDidMount() {
    this.fetchPosts();
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
        />

        <div id="posts-container">
          {posts}
        </div>
      </div>
    );
  }
}
