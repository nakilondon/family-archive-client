import React, { useEffect, useState } from "react";
import FamilyTreeDiagram from "./FamilyDiagram";
import { loadFamilyTree } from "../../redux/actions/familyTreeActions";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

function FamilyTree({
  familyTree,
  loadFamilyTree,
  selectedPerson,
  setSelectedPerson,
  firebase,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((familyTree.length === 0) & !loading) {
      setLoading(true);
      loadFamilyTree(firebase.auth.stsTokenManager.accessToken)
        .catch((error) => {
          alert("Loading family tree failed " + error);
        })
        .then(() => setLoading(false));
    }
  }, [
    familyTree.length,
    loading,
    loadFamilyTree,
    firebase.auth.stsTokenManager.accessToken,
  ]);

  const content =
    familyTree.length === 0 ? (
      <Spinner />
    ) : (
      <FamilyTreeDiagram
        familyItems={familyTree}
        id={selectedPerson}
        selectedPerson={setSelectedPerson}
      />
    );

  return (
    <Grid container align="center">
      {content}
    </Grid>
  );
}

FamilyTree.prototypes = {
  familyTree: PropTypes.array.isRequired,
  loadFamilyTree: PropTypes.func.isRequired,
  selectedPerson: PropTypes.number.isRequired,
  setSelectedPerson: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    familyTree: state.familyTree,
    selectedPerson: state.selectedPerson,
    firebase: state.firebase,
  };
}

const mapDisPatchToProps = {
  loadFamilyTree,
  setSelectedPerson,
};

export default connect(mapStateToProps, mapDisPatchToProps)(FamilyTree);
