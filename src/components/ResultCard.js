import React, { Component } from "react";
import "../App.css";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

export default class ResultCard extends Component {
  render() {
    //console.log("mount", this.props.movie);
    const { movie, addNominate, updateNominateBtn } = this.props;
    const { Title, Poster, Year, mount } = movie;
    //console.log(mount, "this is mount");
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

            {mount ? (
              <Button
                onClick={() => (addNominate(movie), updateNominateBtn(movie))}
                disabled
              >
                Nominated!
              </Button>
            ) : (
              <Button
                onClick={() => (addNominate(movie), updateNominateBtn(movie))}
              >
                Nominate
              </Button>
            )}
          </CardBody>
        </Card>
      </>
    );
  }
}
