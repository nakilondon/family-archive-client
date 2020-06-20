import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//import GridList from "@material-ui/core/GridList";
//import GridListTile from "@material-ui/core/GridListTile";
//import AwesomeSlider from "react-awesome-slider";
//import "react-awesome-slider/dist/styles.css";
//import AwsSliderStyles from "react-awesome-slider/dist/styles.css";
//import { Carousel } from "react-responsive-carousel";
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import "./style.css";
import PhotoGallery from "../common/photoGallery";
//import Gallery from "../common/Gallery";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

const OutputDetails = ({ personDetails, setSelectedPerson, deletePerson }) => {
  const classes = useStyles();

  const FamilyTable = (Family) => {
    if (Family == null) {
      return <p>No Family</p>;
    }

    return (
      <Grid item container justify="flex-end">
        {Family.map((member) => (
          <Grid
            key={member.id}
            container
            direction="row"
            alignItems="center"
            justify="flex-end"
          >
            <Grid item container xs={10} direction="column" justify="flex-end">
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">
                  {member.relationship}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{member.name}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setSelectedPerson(member.id)}
              >
                Select
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const OtherDetails = (personDetails) => {
    return (
      <Grid item container direction="column">
        <Paper elevation={0}>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              Preferred Name
            </Typography>
            <Typography variant="h6">{personDetails.preferredName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              Surname
            </Typography>
            <Typography variant="h6">{personDetails.surname}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              Given Names
            </Typography>
            <Typography variant="h6">{personDetails.givenNames}</Typography>
          </Grid>
          {personDetails.nickName !== "" && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Nick Name
              </Typography>
              <Typography variant="h6">{personDetails.nickName}</Typography>
            </Grid>
          )}
          {personDetails.birth !== null && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Birth
              </Typography>
              <Typography variant="h6">
                {personDetails.birth}{" "}
                {personDetails.placeOfBirth !== "" &&
                  `- ${personDetails.placeOfBirth}`}
              </Typography>
            </Grid>
          )}
          {personDetails.death !== null && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Death
              </Typography>
              <Typography variant="h6">
                {personDetails.death}
                {personDetails.placeOfDeath !== "" &&
                  `- ${personDetails.placeOfDeath}`}
              </Typography>
            </Grid>
          )}
          {personDetails.note !== "" && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Note
              </Typography>
              <Typography variant="h6">{personDetails.note}</Typography>
            </Grid>
          )}
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={deletePerson}
          >
            Delete
          </Button>
        </Paper>
      </Grid>
    );
  };

  let photos = [];
  personDetails.images.map((i) =>
    photos.push({
      photo: `familytree/original/${i.fileName}`,
      thumbnail: `familytree/thumbnail/${i.fileName}`,
      caption: i.caption,
    })
  );
  return (
    <Grid
      spacing={3}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">{personDetails.preferredName}</Typography>
      </Grid>
      <Grid item>
        <img alt="portrait" src={`familytree/img/${personDetails.portrait}`} />
      </Grid>
      <Grid
        item
        spacing={7}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid container xs={3} item justify="flex-end">
          {FamilyTable(personDetails.family)}
        </Grid>
        <Grid container xs={3} item justify="flex-start">
          {OtherDetails(personDetails)}
        </Grid>
      </Grid>

      <PhotoGallery photos={photos} />

      {/*
      <Grid item container style={{ height: "400px" }}>
        <AwesomeSlider cssModule={AwsSliderStyles}>
          {personDetails.images.map((image) => (
            <div data-src={`familytree/img/${image}`} />
          ))}
        </AwesomeSlider>
      </Grid>
          */}
    </Grid>
  );
};

OutputDetails.prototypes = {
  personDetails: PropTypes.object.isRequired,
  setSelectedPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
};

export default OutputDetails;
