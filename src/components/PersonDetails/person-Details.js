import React, { useEffect, useState } from "react";
import { loadPersonDetails } from "../../redux/actions/personDetailsActions";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import OutputDetails from "./outputDetails";

function PersonDetails({
  personDetails,
  loadPersonDetails,
  selectedPerson,
  setSelectedPerson,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (personDetails.id === selectedPerson) {
      setLoading(false);
    } else {
      loadPersonDetails(selectedPerson)
        .catch((error) => {
          alert("Loading person details failed " + error);
        })
        .then(() => setLoading(false));
    }
  }, [personDetails.id, selectedPerson, loadPersonDetails]);

  const content = loading ? (
    <Spinner />
  ) : (
    <OutputDetails
      personDetails={personDetails}
      setSelectedPerson={setSelectedPerson}
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
};

function mapStateToProps(state) {
  return {
    personDetails: state.personDetails,
    selectedPerson: state.selectedPerson,
  };
}

const mapDispatchToProps = {
  loadPersonDetails,
  setSelectedPerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
