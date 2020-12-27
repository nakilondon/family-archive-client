import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { Typography, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const OutputDetails = ({ pictureDetails, deletePicture, editPicture }) => {
  const profile = useSelector(({ firebase: { profile } }) => profile);

  const peopleTable = (People) => {
    if (People == null) {
      return <p>No People</p>;
    }

    return (
      <Grid item container justify="flex-end">
        <Grid container direction="row" alignItems="center" justify="flex-end">
          <Grid item container direction="column" justify="flex-end">
            <Typography variant="subtitle1" color="textSecondary">
              People in image
            </Typography>
            {People.map((person) => (
              <Grid item key={person.id}>
                <Typography variant="h6">{person.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const OtherDetails = (pictureDetails) => {
    return (
      <Grid item container direction="column">
        <Paper elevation={0}>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              File Name
            </Typography>
            <Typography variant="h6">{pictureDetails.fileName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              Type
            </Typography>
            <Typography variant="h6">{pictureDetails.type}</Typography>
          </Grid>
          {pictureDetails.displayDate !== "" && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Date
              </Typography>
              <Typography variant="h6">{pictureDetails.displayDate}</Typography>
            </Grid>
          )}
          {pictureDetails.location.description !== "" && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Location
              </Typography>
              <Typography variant="h6">
                {pictureDetails.location.description}
              </Typography>
            </Grid>
          )}
          {pictureDetails.description !== "" && (
            <Grid item>
              <Typography variant="subtitle1" color="textSecondary">
                Description
              </Typography>
              <Typography variant="h6">{pictureDetails.description}</Typography>
            </Grid>
          )}
        </Paper>
      </Grid>
    );
  };

  return (
    <Grid
      spacing={3}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Picture Details</Typography>
      </Grid>
      <Grid item>
        <img alt="current" src={`picture/img/${pictureDetails.fileName}`} />
      </Grid>
      <Grid
        item
        spacing={3}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item>{peopleTable(pictureDetails.people)}</Grid>
        <Grid item>{OtherDetails(pictureDetails)}</Grid>
      </Grid>
      <Grid item>
        {!isLoaded(profile) ? (
          <p>Loading...</p>
        ) : (
          profile.token.claims.hasOwnProperty("edit") && (
            <Grid
              item
              spacing={3}
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={deletePicture}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={editPicture}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  );
};

OutputDetails.prototypes = {
  pictureDetails: PropTypes.object.isRequired,
  deletePicture: PropTypes.func.isRequired,
};

export default OutputDetails;
