import React, { useEffect, useState, useRef } from "react";
import { uploadImage } from "../../redux/actions/uploadImageActions";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ImageUploader from "react-images-upload";
import { newImage } from "../../api/defaults";
import LocationSearch from "../common/LocationSearch";
import DateSelect from "../common/DateSelect";
import PeopleList from "../common/PeopleList";

import "./styles.css";

function PersonEdit({ uploadImage }) {
  const [saving, setSaving] = useState(false);
  const [existsError, setExistsErrors] = useState(false);
  const isMountedRef = useRef(null);
  const [description, setDescription] = useState({ ...newImage });
  const [picture, setPicture] = useState({});

  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  function onDescriptionChange(id, value) {
    if (id === "name") {
      setExistsErrors(false);
    }
    const valueData = { [id]: value };
    setDescription((prevDetails) => ({
      ...prevDetails,
      ...valueData,
    }));
  }

  function onDrop(newPicture) {
    setPicture(newPicture[0]);
    if (newPicture[0]?.name !== undefined) {
      onDescriptionChange("name", newPicture[0].name);
    }
  }

  function onLocationChange(id, location) {
    if (location !== null) {
      const locationSave = {
        description: location.description,
        placeId: location.place_id,
      };
      onDescriptionChange("location", locationSave);
    }
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);

    uploadImage(picture, description)
      .then((response) => {
        toast.success(`${description.name} successfully saved ...`);
        setSaving(false);
        setDescription({ ...newImage });
        setPicture({});
      })
      .catch((error) => {
        alert(`Upload image resulted in error - ${error}`);
        setSaving(false);
        if (`${error}`.includes("already exists")) {
          setExistsErrors(true);
        }
      });
  }

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h4">Upload Image</Typography>
      </Grid>
      <form onSubmit={handleSave} style={{ width: 900 }}>
        <Grid item container direction="column">
          <Grid
            item
            container
            alignItems="flex-start"
            justify="space-between"
            direction="row"
            spacing={2}
          >
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <TextField
                  id="description"
                  label="Description"
                  onChange={(e) =>
                    onDescriptionChange(e.target.id, e.target.value)
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  error={existsError ? true : false}
                  helperText={
                    existsError ? "Filename exists, please change" : ""
                  }
                  id="name"
                  label="Picture"
                  value={description.name}
                  onChange={(e) =>
                    onDescriptionChange(e.target.id, e.target.value)
                  }
                />
              </Grid>
              <Grid item xs>
                <LocationSearch
                  style={{ width: "100%" }}
                  label="Location"
                  onChange={onLocationChange}
                />
              </Grid>
              <Grid item>
                <DateSelect
                  id="date"
                  label="When was the photo taken"
                  dateValue={description.date}
                  onChange={onDescriptionChange}
                />
              </Grid>
              <Grid item>
                <PeopleList
                  People={description.people}
                  label={"Who is in the picture"}
                  name={"people"}
                  changePeople={onDescriptionChange}
                />
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={6}>
              <Grid item>
                <ImageUploader
                  withIcon={false}
                  withPreview={true}
                  label=""
                  buttonText="Upload Image"
                  onChange={onDrop}
                  singleImage={true}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  fileSizeError="file size is too big"
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  saving || description.name === "not set" ? true : false
                }
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

PersonEdit.prototypes = {
  uploadImage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonEdit);
