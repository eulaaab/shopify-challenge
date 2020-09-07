import React, { Component } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "http://www.omdbapi.com/";

console.log(process.env.REACT_APP_API_KEY);

export default class Search extends Component {
  state = {
    query: "",
    movieResult: "",
  };

  componentDidMount() {
    axios
      .get(`${API_URL}?s=guardian&apikey=${API_KEY}&type=movie`)
      .then((res) => {
        console.log(res.data);
      });
  }
  movieQuery = (event) => {
    const query = "guardian";
    if (query.length) {
      axios
        .get(`${URL}?s=${query}&apikey=${API_KEY}&type=movie`)
        .then((res) => {
          console.log(res.data);
          this.setState(() => ({
            movieResult: res.data,
          }));
        })
        .catch((err) => {
          console.log("there's an error in getting movies: ", err);
        });
    }
  };
  render() {
    const { query } = this.state;
    return (
      <div>
        <h2>Movie Title</h2>
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
