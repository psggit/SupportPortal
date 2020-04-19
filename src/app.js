import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./pagination";
import Post from "./post";
import "./style.scss";

class App extends React.Component {
  constructor() {
    super();
    this.pagesLimit = 5;
    this.state = {
      totalCount: 0,
      data: [],
      posts: [],
      activePage: 1
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log("data", data, data.length);
        this.setState({
          totalCount: data.length,
          data,
          posts: data.slice(0, 5)
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  handlePageChange({ activePage, offset }) {
    this.setState({
      activePage,
      posts: this.state.data.slice(offset, offset + this.pagesLimit)
    });
  }

  render() {
    const { posts, data } = this.state;
    return (
      <div class="main-container">
        <div class="post-container">
          {posts.map(item => {
            return <Post data={item} />;
          })}
        </div>

        {data.length > 0 && (
          <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.state.totalCount}
            pageRangeDisplayed={5}
            setPage={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default App

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
