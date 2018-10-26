import { Component } from "react";

export class NotFound extends Component {
  componentDidMount() {
    alert("Page does not exist");
    window.location.href = "/";
  }

  render() {
    return null;
  }
}
