import React, { Component } from "react";

export default class Nominations extends Component {
  render() {
    const { nominee, toggleNominate } = this.props;
    //console.log(nomList);
    const { Title, Poster, Year, imdbID } = nominee;
    return (
      <div>
        Nominations
        <p>{Title}</p>
        <div>{Year}</div>
        <img className="img" src={Poster} />
        <button onClick={() => toggleNominate(nominee)}>Remove</button>
      </div>
    );
  }
}
