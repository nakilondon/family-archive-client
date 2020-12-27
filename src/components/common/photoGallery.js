import React, { Component } from "react";
import { ReactBnbGallery } from "react-bnb-gallery";
import Button from "@material-ui/core/Button";
import "react-bnb-gallery/dist/style.css";

export default class Example extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      galleryOpened: false,
    };
    this.toggleGallery = this.toggleGallery.bind(this);
  }

  toggleGallery() {
    this.setState((prevState) => ({
      galleryOpened: !prevState.galleryOpened,
    }));
  }

  render() {
    return (
      <>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.toggleGallery}
        >
          Open gallery
        </Button>
        <ReactBnbGallery
          show={this.state.galleryOpened}
          photos={this.props.photos}
          onClose={this.toggleGallery}
        />
      </>
    );
  }
}
