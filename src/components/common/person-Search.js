/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { loadPeopleList } from "../../redux/actions/peopleListActions";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import { isLoaded } from "react-redux-firebase";

function PersonSelect({
  peopleList,
  loadPeopleList,
  onSearchChange,
  selectedPerson,
  firebase,
  label,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoaded(firebase.auth) && peopleList.length === 0 && !loading) {
      setLoading(true);
      loadPeopleList(firebase.auth.stsTokenManager.accessToken)
        .catch((error) => {
          alert("Loading people list failed " + error);
        })
        .then(() => setLoading(false));
    }
  }, [firebase.auth, peopleList.length, loading, loadPeopleList]);

  const person = selectedPerson === null ? "" : selectedPerson;

  const content =
    peopleList.length === 0 ? (
      <Spinner />
    ) : (
      <Autocomplete
        value={person}
        placeholder="Search…"
        id="personSearchId"
        options={peopleList}
        style={{ width: 400 }}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={onSearchChange}
      />
    );

  return <>{content}</>;
}

PersonSelect.prototypes = {
  peopleList: PropTypes.array.isRequired,
  loadPeopleList: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedPerson: PropTypes.object.isOptional,
  firebase: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    peopleList: state.peopleList,
    firebase: state.firebase,
  };
}

const mapDispatchToProps = {
  loadPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonSelect);
