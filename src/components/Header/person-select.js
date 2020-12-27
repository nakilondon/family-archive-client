import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSelectedPerson } from "../../redux/actions/selectedPersonActions";
import Selector from "../common/person-Search";
import { isLoaded } from "react-redux-firebase";

function PersonSelect({
  setSelectedPerson,
  peopleList,
  selectedPerson,
  profile,
}) {
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded(profile) && !profileLoaded) {
      setSelectedPerson(profile.defaultPerson);
      setProfileLoaded(true);
    }
  }, [profile, profile.defaultPerson, profileLoaded, setSelectedPerson]);

  const onSearchChange = (e, value) => {
    if (value?.id) setSelectedPerson(value.id);
  };

  const selected =
    peopleList.length === 0
      ? ""
      : peopleList?.find((p) => selectedPerson === p?.id);

  return (
    <>
      <Selector
        label="Find Someone"
        selectedPerson={selected}
        onSearchChange={onSearchChange}
      />
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
    profile: state.firebase.profile,
  };
}

const mapDispatchToProps = {
  setSelectedPerson,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonSelect);
