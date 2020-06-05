import React, { useEffect, useState, useRef } from "react";
import {
  loadPersonDetailsForUpdate,
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
  loadPersonDetailsForUpdate,
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
  const isMountedRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;

    if (
      !mounted |
      ((personDetails.id !== selectedPerson) &
        (!loading | (personDetails.id === undefined)))
    ) {
      setMounted(true);
      setLoading(true);
      loadPersonDetailsForUpdate(selectedPerson)
        .catch((error) => {
          alert("Loading person details failed " + error);
        })
        .then(() => {
          setLoading(false);
        });
    }

    if (
      (personDetailsUpdate.id !== personDetails.id) |
      (loading & (personDetails !== null))
    ) {
      setPersonDetailsUpdate({ ...personDetails });
    }

    //   if (
    //     personDetailsUpdate.id === personDetails.id &&
    //     personDetails.id === selectedPerson
    //   ) {
    //     setLoading(false);
    //   }

    return () => (isMountedRef.current = false);
  }, [
    selectedPerson,
    loadPersonDetailsForUpdate,
    personDetails,
    loading,
    personDetailsUpdate.id,
    personDetailsUpdate.preferredName,
    setViewMode,
    mounted,
  ]);

  function handleChange(e) {
    const valueData = { [e.target.name]: e.target.value };
    setPersonDetailsUpdate((prevPersonDetails) => ({
      ...prevPersonDetails,
      ...valueData,
    }));
  }

  function handleLocationChange(id, location) {
    if (location !== null) {
      const valueData = { [id]: location.description };
      setPersonDetailsUpdate((prevPersonDetails) => ({
        ...prevPersonDetails,
        ...valueData,
      }));
    }
  }

  function changeRelationship(name, list) {
    const valueData = { [name]: list };
    setPersonDetailsUpdate((prevPersonDetails) => ({
      ...prevPersonDetails,
      ...valueData,
    }));
  }

  function handleDateChange(id, dateValue) {
    if (dateValue !== null) {
      const valueData = { [id]: dateValue };

      setPersonDetailsUpdate((prevPersonDetails) => ({
        ...prevPersonDetails,
        ...valueData,
      }));
    }
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
      onLocationChange={handleLocationChange}
      onDateChange={handleDateChange}
      onSave={handleSave}
      saving={saving}
      changeRelationship={changeRelationship}
    />
  );

  return (
    <Grid
      item
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
  loadPersonDetailsForUpdate: PropTypes.func.isRequired,
  savePerson: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    personDetails: state.personDetailsUpdate,
    selectedPerson: state.selectedPerson,
  };
}

const mapDispatchToProps = {
  loadPersonDetailsForUpdate,
  savePerson,
  setViewMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonEdit);
