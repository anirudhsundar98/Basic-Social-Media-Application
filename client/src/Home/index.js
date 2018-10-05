import React, { Component } from 'react';
import config from '../config';
const serverRoot = config.serverRoot;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { username: null },
      users: []
    };
    this.fetchUsers();
    this.getSession();
    this.logout.bind("this");
  }

  async getSession() {
    let currentUser = await fetch(serverRoot + "/session", {
      credentials: "include"
    })
    .then(response => response.json())
    .catch(err => null);

    if (currentUser === null) {
      window.location.href = serverRoot + "/login";
      return;
    }

    this.setState({session: currentUser});
  }

  async fetchUsers() {
    let graphQLQuery = `{
      "query": "query UsersQuery { getAllUsers { username } }"
    }`;

    let users = await this.getUserData(graphQLQuery);
    this.setState({ users });
  };

  getUserData(query) {
    return fetch(serverRoot + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query
    })
    .then(response => response.json())
    .then(response => ( [...response.data.getAllUsers] ))
    .then(data => data.map(user => user.username))
    .catch(err => {
      console.error(err);
    });
  }

  async logout() {
    await fetch(serverRoot + "/logout", {
      method: "DELETE",
      credentials: 'include'
    });

    window.location.href = serverRoot + "/login";
  }

  render() {
    const users = this.state.users.map( (username, id) => {
      return (
        <li key={id}>{username}</li>
      )
    });

    return (
      <React.Fragment>
        <div id="current-user">The current user is {this.state.session.username}</div>
        <div id="users-container">
          <ul>
            {users}
          </ul>
        </div>
        <button onClick={this.logout}>Logout</button>
      </React.Fragment>
    );
  }
}

export default Home;
