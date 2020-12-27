import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { newImage } from "../../api/defaults";
import LocationSearch from "../common/LocationSearch";
import DateSelect from "../common/DateSelect";
import PeopleList from "../common/PeopleList";
import React, { useEffect, useState } from "react";
import {
  loadPictureDetails,
  updatePictureDetails,
} from "../../redux/actions/pictureDetailsActions";
import { setSelectedPicture } from "../../redux/actions/selectedPictureActions";
import Spinner from "../common/Spinner";
import OutputDetails from "./outputDetails";
import { deletePicture } from "../../redux/actions/pictureDetailsActions";
import { setViewMode } from "../../redux/actions/viewActions";
import { ViewMode } from "../../redux/actions/actionTypes";
import EditDetails from "./editDetails";

//import "./styles.css";

function PictureDetails({
  pictureDetails,
  loadPictureDetails,
  updatePictureDetails,
  selectedPicture,
  deletePicture,
  setViewMode,
  firebase,
}) {
  const [loading, setLoading] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [pictureDetailsUpdate, setPictureDetailsUpdate] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted && !loading) {
      setLoading(true);
      loadPictureDetails(
        selectedPicture,
        firebase.auth.stsTokenManager.accessToken
      )
        .catch((error) => {
          alert("Loading picture details failed " + error);
        })
        .then(() => {
          setLoading(false);
        });
    }
    if (pictureDetails !== "" && pictureDetailsUpdate === "") {
      setPictureDetailsUpdate({ ...pictureDetails });
    }
    setMounted(true);
  }, [
    pictureDetails.id,
    selectedPicture,
    loadPictureDetails,
    firebase.auth.stsTokenManager.accessToken,
    pictureDetails,
    loading,
    mounted,
    pictureDetailsUpdate,
  ]);

  function handelEdit() {
    setEditPicture(true);
  }

  function handeldelete(event) {
    event.preventDefault();

    deletePicture(pictureDetails.id, firebase.auth.stsTokenManager.accessToken)
      .then(() => {
        toast.success(`${pictureDetails.preferredName} Deleted ...`);

        setViewMode(ViewMode.SHOW_FAMILY_TREE);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleChange(e) {
    const valueData = { [e.target.name]: e.target.value };
    setPictureDetailsUpdate((prevPictureDetails) => ({
      ...prevPictureDetails,
      ...valueData,
    }));
  }

  function handleLocationChange(id, location) {
    if (location !== null) {
      const valueData = { [id]: location.description };
      setPictureDetailsUpdate((prevPictureDetails) => ({
        ...prevPictureDetails,
        ...valueData,
      }));
    }
  }

  function handleDateChange(id, dateValue) {
    if (dateValue !== null) {
      const valueData = { [id]: dateValue };

      setPictureDetailsUpdate((prevPictureDetails) => ({
        ...prevPictureDetails,
        ...valueData,
      }));
    }
  }

  function changePeople(name, list) {
    const valueData = { [name]: list };
    setPictureDetailsUpdate((prevPersonDetails) => ({
      ...prevPersonDetails,
      ...valueData,
    }));
  }

  function formIsValid() {
    return true;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    updatePictureDetails(
      pictureDetailsUpdate,
      firebase.auth.stsTokenManager.accessToken
    )
      .then(() => {
        toast.success(" Changes saved ...");
        setEditPicture(false);
      })
      .catch((error) => {
        setSaving(false);
        // setErrors({ onSave: error.message });
      });
  }

  const content =
    !mounted || loading ? (
      <Spinner />
    ) : editPicture ? (
      pictureDetailsUpdate !== "" ? (
        <EditDetails
          pictureDetails={pictureDetailsUpdate}
          changePeople={changePeople}
          onSave={handleSave}
          onChange={handleChange}
          saving={saving}
          onLocationChange={handleLocationChange}
          onDateChange={handleDateChange}
          errors={errors}
        />
      ) : (
        <Spinner />
      )
    ) : (
      <OutputDetails
        pictureDetails={pictureDetails}
        deletePicture={handeldelete}
        editPicture={handelEdit}
      />
    );

  return (
    <Grid
      container
      space={5}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item container>
        {content}
      </Grid>
    </Grid>
  );
}

PictureDetails.prototypes = {
  pictureDetails: PropTypes.object.isRequired,
  loadPictureDetails: PropTypes.func.isRequired,
  selectedPicture: PropTypes.number.isRequired,
  setSelectedPicture: PropTypes.func.isRequired,
  deletePicture: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  firbase: PropTypes.object.isRequired,
  updatePictureDetails: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    pictureDetails: state.pictureDetails,
    selectedPicture: state.selectedPicture,
    firebase: state.firebase,
  };
}

const mapDispatchToProps = {
  loadPictureDetails,
  setSelectedPicture,
  deletePicture,
  setViewMode,
  updatePictureDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(PictureDetails);
