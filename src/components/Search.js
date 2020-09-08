import React, { Component } from "react";
import axios from "axios";
import Result from "../components/Results";
import Nominations from "../components/Nominations";
import "../App.css";
import {
  UncontrolledAlert,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

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
    if (nomList.length < 5 && nomList.imdbID !== obj.imdbID) {
      this.addNominate(obj);
    }
    // else {
    //   this.removeNominate(obj);
    // }
  };

  addNominate = (obj) => {
    const { nomList } = this.state;
    let nominations = [];

    nominations.push(obj);
    this.setState({
      nomList: [...nominations, ...nomList],
      isNominate: true,
    });
  };

  removeNominate = (obj) => {
    const { movieResult, nomList } = this.state;
    for (let i = nomList.length - 1; i >= 0; --i) {
      if (nomList[i].imdbID === obj.imdbID) {
        console.log(obj);
        nomList.splice(i, 1);
        this.setState({
          nomList: [...nomList],
          isNominate: false,
        });
      }
    }
    // nomList = nomList.filter((item) => {
    //   console.log("item", item);
    //   return item.imdbID !== obj.imdbID;
    // });
  };

  render() {
    const { query, movieResult, nomList, isNominate } = this.state;
    let warning = "";
    if (nomList.length === 5) {
      warning = (
        <UncontrolledAlert color="info">
          You've added 5 Nominations!
        </UncontrolledAlert>
      );
    }
    // console.log("nomList", nomList);
    return (
      <div>
        {warning}
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <InputGroupText>SEARCH MOVIE</InputGroupText>
            <Input
              type="text"
              placeholder="Search a movie"
              value={query}
              onChange={this.handleChange}
            />
          </InputGroup>
        </form>
        <div className="main">
          <div
            className="results-container"
            style={{
              position: "relative",
              height: "100vh",
              overflow: "scroll",
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "10px",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            {movieResult.length > 0 && (
              <div>
                <h4>SEARCH RESULTS</h4>
                <span> {movieResult.length} </span> MOVIES
              </div>
            )}
            <ol className="results-grid">
              {movieResult !== [] ? (
                movieResult.length > 0 ? (
                  movieResult.map((movie) => (
                    <Result
                      movieResult={movieResult}
                      movie={movie}
                      key={movie.imdbID}
                      toggleNominate={this.toggleNominate.bind(this)}
                      isNominate={isNominate}
                    />
                  ))
                ) : (
                  <h4>NO RESULT</h4>
                )
              ) : (
                <h4>NO RESULT</h4>
              )}
            </ol>
          </div>
          <div
            className="results-container"
            style={{
              position: "relative",
              height: "100vh",
              overflow: "scroll",
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "10px",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
          >
            <h4>NOMINATIONS</h4>
            {nomList.length > 0 && (
              <div>
                <span> {nomList.length} </span>of maximum 5 nominations
              </div>
            )}
            <ol className="results-grid">
              {nomList.map((nominee) => (
                <Nominations
                  key={nominee.imdbID}
                  nominee={nominee}
                  removeNominate={this.removeNominate.bind(this)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
