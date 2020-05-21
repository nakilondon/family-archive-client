import React, { useEffect } from "react";
import { loadPeopleList } from "../../redux/actions/peopleListActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";

function PersonSelect({
  peopleList,
  loadPeopleList,
  setSelectedPerson,
  selectedPerson,
}) {
  useEffect(() => {
    if (peopleList.length === 0) {
      loadPeopleList().catch((error) => {
        alert("Loading people list failed " + error);
      });
    }
  });

  const onSeachChange = (e) => {
    const id = e.target.value;
    setSelectedPerson(id);
  };

  const content =
    peopleList.length === 0 ? (
      <Spinner />
    ) : (
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>Current Person</Grid>
        <Grid item>
          <select
            className="form-control"
            value={selectedPerson}
            onChange={onSeachChange}
          >
            {peopleList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
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
  setSelectedPerson: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    peopleList: state.peopleList,
    selectedPerson: state.selectedPerson,
  };
}

const mapDispatchToProps = {
  loadPeopleList,
  setSelectedPerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonSelect);
