import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import Selector from "../common/person-Search";

function PersonSelect({ setSelectedPerson, peopleList, selectedPerson }) {
  const onSearchChange = (e, value) => {
    if (value?.id) setSelectedPerson(value.id);
  };

  const selected =
    peopleList.length === 0
      ? ""
      : peopleList?.find((p) => selectedPerson === p?.id);

  return (
    <>
      <Selector selectedPerson={selected} onSearchChange={onSearchChange} />
    </>
  );
}

PersonSelect.prototypes = {
  setSelectedPerson: PropTypes.func.isRequired,
  peopleList: PropTypes.array.isRequired,
  selectedPerson: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    peopleList: state.peopleList,
    selectedPerson: state.selectedPerson,
  };
}

const mapDispatchToProps = {
  setSelectedPerson,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonSelect);
