import React, { Component } from "react";
import "../App.css";

export default class Results extends Component {
  // handleNominate = (movie) => {
  //   const { toggleNominate } = this.props;
  //   console.log(movie);
  //   //console.log(movieResult.Title);
  //   toggleNominate(movie);
  // };
  render() {
    //console.log(this.props.toggleNominate);
    const { movie, movieResult, toggleNominate } = this.props;
    const { Title, Poster, Year, imdbID } = movie;
    return (
      <div className="result-card">
        <p>{Title}</p>
        <div>{Year}</div>
        <img className="img" src={Poster} />
        <button onClick={() => toggleNominate(movie)}>Nominate</button>
      </div>
    );
  }
}
