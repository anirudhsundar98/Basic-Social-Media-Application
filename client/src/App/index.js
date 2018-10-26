import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav } from "./Nav";
import { SessionChecker } from "./Components/SessionChecker";
import { Home } from "./Home";
import { Settings } from "./Settings";
import { Post } from "./Post";
import { User } from "./User";
import { NotFound } from "./NotFound";
import config from "./config";
const serverRoot = config.serverRoot;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { id: -1, username: null }
    };
    this.sendGraphQLQuery = this.sendGraphQLQuery.bind(this);
    this.updateStateUsername = this.updateStateUsername.bind(this);
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

  updateStateUsername(username) {
    this.setState({
      session: {
        id: this.state.session.id,
        username: username
      }
    })
  }

  async componentDidMount() {
    await this.getCurrentSession();
  }

  render() {
    let appProps = {
      sendGraphQLQuery: this.sendGraphQLQuery,
      session: this.state.session
    };

    return (
      <Router>
        <React.Fragment>
          {/* Uncomment the line below if regular session checks are necessary */}
          {/* <SessionChecker sendGraphQLQuery={this.sendGraphQLQuery} /> */}
          <Nav session={this.state.session} />
          <Switch>
            <Route
              exact path="/"
              render={ (routeProps) => (
                <Home {...appProps} {...routeProps} />
              )}
            />
            <Route
              exact path="/settings"
              render={ (routeProps) => (
                <Settings updateStateUsername={this.updateStateUsername} {...appProps} {...routeProps} />
              )}
            />
            <Route
              exact path="/posts/:id"
              render={ (routeProps) => (
                <Post {...appProps} {...routeProps} />
              )}
            />
            <Route
              exact path="/users/:username"
              render={ (routeProps) => (
                <User {...appProps} {...routeProps} />
              )}
            />
            <Route
              path="/"
              component={ NotFound }
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
