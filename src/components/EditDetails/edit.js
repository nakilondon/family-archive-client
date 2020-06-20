import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import LocationSearch from "../common/LocationSearch";
import DateSelect from "../common/DateSelect";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FamilyTable from "../common/PeopleList";

const Edit = ({
  personDetails,
  onSave,
  onChange,
  saving = false,
  onLocationChange,
  onDateChange,
  changeRelationship,
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
        <Typography variant="h4">{personDetails.preferredName}</Typography>
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
          <Grid item container direction="column" xs={7}>
            <FamilyTable
              People={personDetails.parents}
              label={"Parents"}
              name={"parents"}
              changePeople={changeRelationship}
            />
            <FamilyTable
              People={personDetails.spouses}
              label={"Spouses"}
              name={"spouses"}
              changePeople={changeRelationship}
            />
            <FamilyTable
              People={personDetails.children}
              label={"Children"}
              name={"children"}
              changePeople={changeRelationship}
            />
          </Grid>
          <Grid item container spacing={1} direction="column" xs={5}>
            <Grid item>
              <TextField
                name={"preferredName"}
                label="Preferred Name"
                style={{ width: "100%" }}
                defaultValue={personDetails.preferredName}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="givenNames"
                label="Given Names"
                style={{ width: "100%" }}
                defaultValue={personDetails.givenNames}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="surname"
                label="Surname"
                style={{ width: "100%" }}
                defaultValue={personDetails.surname}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="nickName"
                label="Nick Name"
                style={{ width: "100%" }}
                defaultValue={personDetails.nickName}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <FormControl size="small">
                <FormLabel style={{ fontSize: 12 }}>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={personDetails.gender}
                  onChange={onChange}
                  row
                >
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <DateSelect
                id="birth"
                label="Date of Birth"
                dateValue={personDetails.birth}
                onChange={onDateChange}
              />
            </Grid>
            <Grid item>
              <LocationSearch
                id="placeOfBirth"
                style={{ width: "100%" }}
                label="Place of Birth"
                onChange={onLocationChange}
                value={personDetails.placeOfBirth}
              />
            </Grid>
            <Grid item>
              <FormControl>
                <FormLabel style={{ fontSize: 12 }}>Status</FormLabel>
                <RadioGroup
                  name="status"
                  value={personDetails.status}
                  onChange={onChange}
                  row
                >
                  <FormControlLabel
                    value="Living"
                    control={<Radio />}
                    label="Living"
                  />
                  <FormControlLabel
                    value="Dead"
                    control={<Radio />}
                    label="Deceased"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {personDetails.status === "Dead" && (
              <>
                <Grid item>
                  <DateSelect
                    id="death"
                    label="Date of Death"
                    dateValue={personDetails.death}
                    onChange={onDateChange}
                  />
                </Grid>
                <Grid item xs>
                  <LocationSearch
                    id="placeOfDeath"
                    style={{ width: "100%" }}
                    label="Place of Death"
                    onChange={onLocationChange}
                    value={personDetails.placeOfDeath}
                  />
                </Grid>
              </>
            )}
            <Grid item xs>
              <TextField
                name="note"
                label="Note"
                multiline
                style={{ width: "100%" }}
                defaultValue={personDetails.note}
                onChange={onChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="portrait"
                label="Portrait"
                style={{ width: "100%" }}
                defaultValue={personDetails.portrait}
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

export default Edit;
