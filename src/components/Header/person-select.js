import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import Selector from "../common/person-Search";

function PersonSelect({ setSelectedPerson }) {
  const onSearchChange = (e, value) => {
    if (value?.id) setSelectedPerson(value.id);
  };

  return (
    <>
      <Selector onSearchChange={onSearchChange} />
    </>
  );
}

PersonSelect.prototypes = {
  setSelectedPerson: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setSelectedPerson,
};

export default connect(null, mapDispatchToProps)(PersonSelect);
