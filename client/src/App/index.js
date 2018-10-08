import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav } from "./Nav";
import { Home } from "./Home";
import { Post } from "./Post";
import config from "./config";
const serverRoot = config.serverRoot;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { username: null }
    };
    this.sendGraphQLQuery = this.sendGraphQLQuery.bind(this);
    this.checkSession = this.checkSession.bind(this);
  }

  sendGraphQLQuery(query) {
    return fetch(serverRoot + "/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query.split("\n").join(" "),
      credentials: "include"
    })
    .then(response => response.json());
  }

  async getCurrentSession() {
    let graphQLQuery = `{ "query":
      "query getUser {
        getCurrentUser {
          id
          username
        }
      }"
    }`;
    let currentUser = await this.sendGraphQLQuery(graphQLQuery)
      .then( response => response.data.getCurrentUser )
      .catch( err => {
        console.error(err);
        return null;
      });

    if (currentUser === null) {
      window.location.href = serverRoot + "/login";
      return;
    }

    this.setState({ session: currentUser });
  }

  async checkSession() {
    let graphQLQuery = `{ "query":
      "query getSession {
        getSession
      }"
    }`;

    let sessionId = await this.sendGraphQLQuery(graphQLQuery)
      .then( response => response.data.getSession )
      .catch( err => {
        console.error(err);
        return null;
      });

    if (!sessionId) {
      alert("Your session has expired. Please log back in.")
      window.location.href = serverRoot + "/login";
      return;
    }
  }

  async componentDidMount() {
    await this.getCurrentSession();
  }

  render() {
    let appProps = {
      sendGraphQLQuery: this.sendGraphQLQuery,
      session: this.state.session,
      checkSession: this.checkSession
    };

    return (
      <Router>
        <React.Fragment>
          <Nav />
          <Switch>
            <Route
              exact path="/"
              render={ (routeProps) => (
                <Home {...appProps} {...routeProps} />
              )}
            />
            <Route
              exact path="/posts/:id"
              render={ (routeProps) => (
                <Post {...appProps} {...routeProps} />
              )}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
