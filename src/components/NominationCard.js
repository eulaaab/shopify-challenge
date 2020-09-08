import React, { Component } from "react";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

export default class NominationCard extends Component {
  render() {
    const { nominee, removeNominate } = this.props;
    const { Title, Poster, Year, imdbID } = nominee;
    return (
      <>
        <Card>
          <CardImg top width="80%" src={Poster} alt={`${Title}`} />
          <CardBody>
            <Button onClick={() => removeNominate(nominee)}>Remove</Button>
          </CardBody>
          <CardTitle>{Title}</CardTitle>
          <CardText>{Year}</CardText>
        </Card>
      </>
    );
  }
}
