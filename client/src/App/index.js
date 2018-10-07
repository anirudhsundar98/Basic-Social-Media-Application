import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav } from "./Nav";
import { Home } from "./Home";
import config from "./config";
const serverRoot = config.serverRoot;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: { username: null }
    };
    this.sendGraphQLQuery = this.sendGraphQLQuery.bind(this);
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

    this.setState({ session: currentUser });
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

  componentDidMount() {
    this.getSession();
  }

  render() {
    let appProps = {
      sendGraphQLQuery: this.sendGraphQLQuery,
      session: this.state.session
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
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
