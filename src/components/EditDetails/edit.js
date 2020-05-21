import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Edit = ({
  personDetails,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="h4">{personDetails.preferredName}</Typography>
      </Grid>
      <Grid item>
        <form className={classes.root} onSubmit={onSave}>
          <Grid item>
            <TextField
              id="preferredName"
              label="Preferred Name"
              defaultValue={personDetails.preferredName}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="surName"
              label="Surname"
              defaultValue={personDetails.surname}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="birth"
              label="Birth"
              defaultValue={personDetails.birth}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="death"
              label="Death"
              defaultValue={personDetails.death}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="note"
              label="Note"
              defaultValue={personDetails.note}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="portrait"
              label="Portrait"
              defaultValue={personDetails.portrait}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              {saving ? "Saving..." : "Save"}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Edit;
