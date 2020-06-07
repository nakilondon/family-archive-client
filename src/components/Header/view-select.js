import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ViewMode } from "../../redux/actions/actionTypes";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import * as viewActions from "../../redux/actions/viewActions";
import { bindActionCreators } from "redux";

const children = [
  <ToggleButton
    key={ViewMode.SHOW_FAMILY_TREE}
    value={ViewMode.SHOW_FAMILY_TREE}
  >
    Family Tree
  </ToggleButton>,
  <ToggleButton key={ViewMode.SHOW_DETAIL} value={ViewMode.SHOW_DETAIL}>
    Detail
  </ToggleButton>,
  <ToggleButton key={ViewMode.SHOW_EDIT} value={ViewMode.SHOW_EDIT}>
    Edit
  </ToggleButton>,
  <ToggleButton key={ViewMode.SHOW_ADD} value={ViewMode.SHOW_ADD}>
    Add
  </ToggleButton>,
  <ToggleButton key={ViewMode.SHOW_UPLOAD} value={ViewMode.SHOW_UPLOAD}>
    Upload
  </ToggleButton>,
];

function ViewSelect({ selected, setViewMode }) {
  function handleChange(event, value) {
    setViewMode(value);
  }

  return (
    <div>
      <ToggleButtonGroup
        size="small"
        exclusive
        value={selected}
        onChange={handleChange}
      >
        {children}
      </ToggleButtonGroup>
    </div>
  );
}

ViewSelect.prototypes = {
  selected: PropTypes.string.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    selected: state.view,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setViewMode: bindActionCreators(viewActions.setViewMode, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelect);
