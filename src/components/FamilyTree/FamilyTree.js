import React, { useEffect } from "react";
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
}) {
  useEffect(() => {
    if (familyTree.length === 0) {
      loadFamilyTree().catch((error) => {
        alert("Loading family tree failed " + error);
      });
    }
  });

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
};

function mapStateToProps(state) {
  return {
    familyTree: state.familyTree,
    selectedPerson: state.selectedPerson,
  };
}

const mapDisPatchToProps = {
  loadFamilyTree,
  setSelectedPerson,
};

export default connect(mapStateToProps, mapDisPatchToProps)(FamilyTree);
