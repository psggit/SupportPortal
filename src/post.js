import React from "react";
import "./post.scss";

class Post extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="post">
        <div className="post-content">
          <span class="title">ID: </span>
          <span>{this.props.data.id}</span>
        </div>
        <div className="post-content">
          <span className="title">Title: </span>
          <span>{this.props.data.title}</span>
        </div>
      </div>
    );
  }
}

export default Post;
