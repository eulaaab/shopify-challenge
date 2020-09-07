import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <div>
        <h1>Movie Title</h1>
        <input
          type="text"
          placeholder="Search a movie"
          value={query}
          onChange={this.movieQuery}
        />
      </div>
    );
  }
}
