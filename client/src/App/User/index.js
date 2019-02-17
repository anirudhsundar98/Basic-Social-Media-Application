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
        getUser(username: \\"${this.props.match.params.username}\\") {
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

    let posts = await this.props.sendGraphQLQuery(graphQLQuery)
      .then(response => {
        if (response.errors) {
          alert(response.errors[0].message);
          window.location.href = "/";
          throw new Error(response.errors[0].message);
        }

        return response;
      })
      .then(response => ([...response.data.getUser.posts]))
      .catch(err => {
        console.log(err);
        return [];
      });

    this.setState({ posts });
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.fetchPosts();
    }
  }

  componentDidMount() {
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
