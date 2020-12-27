import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Selector from "../common/person-Search";
import { Typography } from "@material-ui/core";

const EditProfile = ({
  profile,
  onSave,
  onChange,
  selectedPerson,
  onPersonChange,
}) => {
  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Update User Profile</Typography>
      </Grid>
      <form onSubmit={onSave} style={{ width: 900 }}>
        <Grid
          item
          container
          alignItems="flex-start"
          justify="space-between"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <TextField
              name="displayName"
              label="Display Name"
              style={{ width: "100%" }}
              onChange={onChange}
              defaultValue={profile.displayName}
            />
          </Grid>
          <Grid item>
            <Selector
              label="Default Person"
              selectedPerson={selectedPerson}
              onSearchChange={onPersonChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default EditProfile;
