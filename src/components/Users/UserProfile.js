import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useFirebase, isLoaded } from "react-redux-firebase";
import EditProfile from "./EditProfile";
import Grid from "@material-ui/core/Grid";

function UpdateProfilePage({ peopleList, profile }) {
  const [profileUpdate, setProfileUpdate] = useState({
    displayName: "",
    defaultPerson: 267,
  });
  const firebase = useFirebase();

  useEffect(() => {
    if (isLoaded(profile) && profileUpdate.displayName === "") {
      setProfileUpdate({
        ...profileUpdate,
        displayName: profile.displayName,
        defaultPerson: profile.defaultPerson,
      });
    }
  }, [profile, profileUpdate]);

  function updateUserProfile() {
    return firebase.updateProfile({ ...profileUpdate });
  }

  function handleChange(e) {
    setProfileUpdate({ ...profileUpdate, [e.target.name]: e.target.value });
  }

  const onPersonChange = (e, value) => {
    if (value?.id) {
      const valueData = { defaultPerson: value.id };
      setProfileUpdate({
        ...profileUpdate,
        ...valueData,
      });
    }
  };

  const selected =
    peopleList?.length === 0
      ? ""
      : peopleList?.find((p) => profileUpdate.defaultPerson === p?.id);

  return (
    <Grid
      item
      container
      space={5}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item container>
        {isLoaded(profile) && profileUpdate.displayName !== "" ? (
          <EditProfile
            profile={profileUpdate}
            onSave={updateUserProfile}
            onChange={handleChange}
            selectedPerson={selected}
            onPersonChange={onPersonChange}
          />
        ) : (
          "Loading..."
        )}
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.firebase.profile,
    peopleList: state.peopleList,
  };
}

export default connect(mapStateToProps)(UpdateProfilePage);
