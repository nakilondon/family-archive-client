import React, { useEffect, useState } from "react";
import {
  loadPersonDetails,
  savePerson,
} from "../../redux/actions/personDetailsActions";
import { ViewMode } from "../../redux/actions/actionTypes";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Edit from "./edit";
import { toast } from "react-toastify";
import { setViewMode } from "../../redux/actions/viewActions";

function PersonEdit({
  loadPersonDetails,
  selectedPerson,
  savePerson,
  personDetails,
  setViewMode,
}) {
  const [loading, setLoading] = useState(true);
  const [personDetailsUpdate, setPersonDetailsUpdate] = useState({
    ...personDetails,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if ((personDetails.id === selectedPerson) & loading) {
      setPersonDetailsUpdate({ ...personDetails });
      setLoading(false);
    } else {
      loadPersonDetails(selectedPerson)
        .catch((error) => {
          alert("Loading person details failed " + error);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [selectedPerson, loadPersonDetails, personDetails, loading]);

  function handleChange(e) {
    const valueData = { [e.target.id]: e.target.value };
    setPersonDetailsUpdate((prevPersonDetails) => ({
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
    savePerson(personDetailsUpdate)
      .then(() => {
        toast.success(`${personDetailsUpdate.preferredName} Changes saved ...`);
        setViewMode(ViewMode.SHOW_DETAIL);
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  const content = loading ? (
    <Spinner />
  ) : (
    <Edit
      personDetails={personDetailsUpdate}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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

PersonEdit.prototypes = {
  personDetails: PropTypes.object.isRequired,
  selectedPerson: PropTypes.number.isRequired,
  loadPersonDetails: PropTypes.func.isRequired,
  savePerson: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    personDetails: state.personDetails,
    selectedPerson: state.selectedPerson,
  };
}

const mapDispatchToProps = {
  loadPersonDetails,
  savePerson,
  setViewMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonEdit);
