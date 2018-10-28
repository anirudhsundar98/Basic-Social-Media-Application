import React, { Component } from 'react';

export default class MorePostsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: (this.props.startId < 0)
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.state.disabled) {
      this.props.fetchMorePosts();
    }
  }

  componentDidUpdate() {
    if (this.props.startId < 0) {
      if (!this.state.disabled)
        this.setState({ disabled: true });
    } else if (this.state.disabled) {
      this.setState({ disabled: false });
    }
  }
  
  render() {
    let className = "",
      content = "";
    if (this.state.disabled) {
      className = "disabled";
      content = "No more posts to fetch";
    } else {
      className = "normal-button";
      content = "Fetch More Posts";
    }

    return (
      <div className={className} id="more-posts-button" onClick={this.handleClick}>{content}</div>
    );
  }
}
