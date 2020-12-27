import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LocationSearch from "../common/LocationSearch";
import DateSelect from "../common/DateSelect";
import FamilyTable from "../common/PeopleList";

const EditPicture = ({
  pictureDetails,
  onSave,
  onChange,
  saving = false,
  onLocationChange,
  onDateChange,
  changePeople,
  errors = {},
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
        <Typography variant="h4">Edit Picture Details</Typography>
      </Grid>
      <Grid item>
        <img alt="current" src={`picture/img/${pictureDetails.fileName}`} />
      </Grid>
      <form onSubmit={onSave} style={{ width: 900 }}>
        <Grid
          item
          container
          alignItems="flex-start"
          justify="space-between"
          direction="row"
          spacing={2}
        >
          <FamilyTable
            People={pictureDetails.people}
            label={"People in picture"}
            name={"people"}
            changePeople={changePeople}
          />
          <Grid item container spacing={1} direction="column" xs={5}>
            <Grid item>
              <TextField
                label="File Name"
                style={{ width: "100%" }}
                defaultValue={pictureDetails.fileName}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Type"
                style={{ width: "100%" }}
                defaultValue={pictureDetails.type}
              />
            </Grid>
            <Grid item>
              <DateSelect
                id="date"
                label="Date of Image"
                dateValue={pictureDetails.date}
                onChange={onDateChange}
              />
            </Grid>
            <Grid item>
              <LocationSearch
                id="location"
                style={{ width: "100%" }}
                label="Location"
                onChange={onLocationChange}
                value={pictureDetails.location}
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="description"
                label="Description"
                multiline
                style={{ width: "100%" }}
                defaultValue={pictureDetails.description}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                {saving ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default EditPicture;
