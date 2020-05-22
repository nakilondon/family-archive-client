/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { loadPeopleList } from "../../redux/actions/peopleListActions";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

function PersonSelect({ peopleList, loadPeopleList, onSearchChange }) {
  useEffect(() => {
    if (peopleList.length === 0) {
      loadPeopleList().catch((error) => {
        alert("Loading people list failed " + error);
      });
    }
  });

  const content =
    peopleList.length === 0 ? (
      <Spinner />
    ) : (
      <Grid container align="row">
        <Grid item>
          <Autocomplete
            placeholder="Search…"
            id="personSearchId"
            options={peopleList}
            style={{ width: 300 }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Find Someone" />
            )}
            onChange={onSearchChange}
          />
        </Grid>
      </Grid>
    );

  return (
    <Grid container align="center">
      {content}
    </Grid>
  );
}

PersonSelect.prototypes = {
  peopleList: PropTypes.array.isRequired,
  loadPeopleList: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    peopleList: state.peopleList,
  };
}

const mapDispatchToProps = {
  loadPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonSelect);
