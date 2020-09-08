import React, { Component } from "react";
import "../App.css";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
  UncontrolledAlert,
} from "reactstrap";

export default class Results extends Component {
  render() {
    const { movie, movieResult, toggleNominate, isNominate } = this.props;
    const { Title, Poster, Year, imdbID } = movie;

    return (
      <>
        <Card>
          <CardImg
            top
            width="80%"
            src={Poster ? Poster : "no image"}
            alt={`${Title}`}
          />
          <CardBody>
            <CardTitle>{Title}</CardTitle>
            <CardText>{Year}</CardText>
            <Button onClick={() => toggleNominate(movie)}>Nominate</Button>
            {/*isNominate ? (
              <Button onClick={() => toggleNominate(movie)} disabled>
                Nominated!
              </Button>
            ) : (
              <Button onClick={() => toggleNominate(movie)}>Nominate</Button>
            )
          */}
          </CardBody>
        </Card>
      </>
    );
  }
}
