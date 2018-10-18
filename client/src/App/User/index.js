import React, { Component } from 'react';
import SimplePost from "../Components/SimplePost";
import "./index.css";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  // Get User's Posts
  async fetchPosts() {
    let graphQLQuery = `{ "query":
      "query PostsQuery {
        getPosts(username: \\"${this.props.match.params.username}\\") {
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
      .then(response => ([...response.data.getPosts]))
      .catch(err => {
        console.error(err);
        return null;
      });

    this.setState({ posts });
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.props.checkSession();
      this.fetchPosts();
    }
  }

  componentDidMount() {
    this.props.checkSession();
    this.fetchPosts();
  }

  render() {
    let posts = this.state.posts.map((post) => {
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

    let title = (this.props.session)
      ? (this.props.match.params.username === this.props.session.username) ? "Your" : `${this.props.match.params.username}'s`
      : null
    ;

    return (
      <div id="main-page-container">
        <h1>{title} page</h1>

        <div id="posts-container">
          {posts}
        </div>
      </div>
    );
  }
}
