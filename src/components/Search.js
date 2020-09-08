import React, { Component } from "react";
import axios from "axios";
import Results from "../components/Results";
import Nominations from "../components/Nominations";
import "../App.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "http://www.omdbapi.com/";

export default class Search extends Component {
  state = {
    query: "",
    loading: false,
    movieResult: [],
    message: "",
    nomList: [],
    isNominate: false,
  };

  handleChange = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({
        query,
        movieResult: [],
      });
    } else {
      this.setState(
        {
          query,
          loading: true,
        },
        () => {
          if (this.state.query) {
            this.fetchMovies(query);
          }
        }
      );
    }
  };
  // movieQuery = (event) => {
  //   event.preventDefault();
  //   const query = event.target.value;
  //   this.setState({
  //     query: query,
  //     movieResult: this.getMovies(query),
  //   });
  // };

  fetchMovies = async (query) => {
    const SEARCH_URL = `${API_URL}?s=${query}&apikey=${API_KEY}&type=movie`;
    await axios
      .get(SEARCH_URL)
      .then((res) => {
        //console.log(res.data.Search);
        let list = res.data.Search;
        if (list && list.length) {
          this.setState({
            movieResult: list,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log("there's an error in getting movies: ", err);
      });
  };

  toggleNominate = (obj) => {
    const { movieResult, nomList } = this.state;
    if (nomList.length < 5) {
      this.addNominate(obj);
    } else {
      this.removeNominate(obj);
    }
  };

  addNominate = (obj) => {
    const { nomList } = this.state;
    let nominations = [];

    nominations.push(obj);
    this.setState({
      nomList: [...nominations, ...nomList],
    });
  };

  removeNominate = (obj) => {
    const { movieResult, nomList } = this.state;
    // nomList.filter((movie) => {
    //   movie.id !== obj.imdbID;
    //   console.log("obj to remove", obj);
    // });
  };

  render() {
    const { query, movieResult, nomList } = this.state;

    return (
      <div>
        <h2>Movie Title</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search a movie"
            value={query}
            onChange={this.handleChange}
          />
        </form>
        <div className="main">
          <div className="results-container">
            <ol className="results-grid">
              {movieResult !== [] ? (
                movieResult.length > 0 ? (
                  movieResult.map((movie) => (
                    <Results
                      movieResult={movieResult}
                      movie={movie}
                      key={movie.imdbID}
                      toggleNominate={this.toggleNominate.bind(this)}
                    />
                  ))
                ) : (
                  <div>No Result</div>
                )
              ) : (
                <div>No Result</div>
              )}
            </ol>
          </div>

          <div className="results-container">
            <ol className="results-grid">
              {nomList.map((nominee) => (
                <Nominations
                  key={nominee.imdbID}
                  nominee={nominee}
                  toggleNominate={this.toggleNominate.bind(this)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
