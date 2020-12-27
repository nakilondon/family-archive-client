import React, { useEffect, useState } from "react";
import { loadPersonDetails } from "../../redux/actions/personDetailsActions";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import OutputDetails from "./outputDetails";
import { deletePerson } from "../../redux/actions/personDetailsActions";
import { setViewMode } from "../../redux/actions/viewActions";
import { ViewMode } from "../../redux/actions/actionTypes";
import { toast } from "react-toastify";
import { setSelectedPicture } from "../../redux/actions/selectedPictureActions";

function PersonDetails({
  personDetails,
  loadPersonDetails,
  selectedPerson,
  setSelectedPerson,
  deletePerson,
  setViewMode,
  firebase,
  setSelectedPicture,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (personDetails.id === selectedPerson) {
      setLoading(false);
    } else {
      loadPersonDetails(
        selectedPerson,
        firebase.auth.stsTokenManager.accessToken
      )
        .catch((error) => {
          alert("Loading person details failed " + error);
        })
        .then(() => setLoading(false));
    }
  }, [
    personDetails.id,
    selectedPerson,
    loadPersonDetails,
    firebase.auth.stsTokenManager.accessToken,
  ]);

  function handeldelete(event) {
    event.preventDefault();

    deletePerson(personDetails.id, firebase.auth.stsTokenManager.accessToken)
      .then(() => {
        toast.success(`${personDetails.preferredName} Deleted ...`);
        setViewMode(ViewMode.SHOW_FAMILY_TREE);
      })
      .catch((error) => {
        //   setSaving(false);
        //   setErrors({ onSave: error.message });
      });
  }

  const content = loading ? (
    <Spinner />
  ) : (
    <OutputDetails
      personDetails={personDetails}
      setSelectedPerson={setSelectedPerson}
      deletePerson={handeldelete}
      setSelectedPicture={setSelectedPicture}
      setViewMode={setViewMode}
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

PersonDetails.prototypes = {
  personDetails: PropTypes.object.isRequired,
  loadPersonDetails: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
  setSelectedPerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  firbase: PropTypes.object.isRequired,
  setSelectedPicture: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    personDetails: state.personDetails,
    selectedPerson: state.selectedPerson,
    firebase: state.firebase,
  };
}

const mapDispatchToProps = {
  loadPersonDetails,
  setSelectedPerson,
  deletePerson,
  setViewMode,
  setSelectedPicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
