/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
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
  useEffect(() => {
    if (isLoaded(firebase.auth) && peopleList.length === 0) {
      //const token = firebase.auth.stsTokenManager.accessToken;
      loadPeopleList(firebase.auth.stsTokenManager.accessToken).catch(
        (error) => {
          alert("Loading people list failed " + error);
        }
      );
    }
  });

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
