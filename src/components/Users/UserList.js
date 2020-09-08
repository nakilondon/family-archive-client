import React, { useEffect, useState } from "react";
import {
  loadUserList,
  deleteUser,
  saveUser,
} from "../../redux/actions/userListActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import OutputUserList from "./outputUeserList";

function UserList({ userList, deleteUser, saveUser, loadUserList, firebase }) {
  const [userListUpdate, setUserListUpdate] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userList.length === 0) {
      loadUserList(firebase.auth.stsTokenManager.accessToken)
        .catch((error) => {
          alert("Loading user list failed " + error);
        })
        .then(setUserListUpdate([...userList]));
    } else {
      if (!loaded) {
        setUserListUpdate([...userList]);
        setLoaded(true);
      }
    }
  }, [
    userList,
    loadUserList,
    firebase.auth.stsTokenManager.accessToken,
    loaded,
  ]);

  function setAdmin(idx) {
    const user = { ...userListUpdate[idx] };
    user.admin = !user.admin;
    setUser(user, idx);
  }

  function setVerified(idx) {
    const user = { ...userListUpdate[idx] };
    user.verified = !user.verified;
    setUser(user, idx);
  }

  function setEdit(idx) {
    const user = { ...userListUpdate[idx] };
    user.edit = !user.edit;
    setUser(user, idx);
  }

  function setUser(user, idx) {
    const newList = [...userListUpdate];
    user.update = true;
    newList[idx] = { ...user };
    setUserListUpdate(newList);
  }

  function removeUser(uid) {
    deleteUser(uid, firebase.auth.stsTokenManager.accessToken)
      .catch((error) => alert(`Delete user failed ${error}`))
      .then(() =>
        setUserListUpdate([...userListUpdate].filter((x) => x.uid !== uid))
      );
  }

  function save(user, idx) {
    saveUser(user, firebase.auth.stsTokenManager.accessToken)
      .catch((error) => alert(`Save user failed ${error}`))
      .then(() => {
        const newList = [...userListUpdate];
        user.update = false;
        newList[idx] = { ...user };
        setUserListUpdate(newList);
      });
  }

  const content =
    userListUpdate?.length > 0 ? (
      <OutputUserList
        userList={userListUpdate}
        setAdmin={setAdmin}
        setEdit={setEdit}
        setVerified={setVerified}
        removeUser={removeUser}
        saveUser={save}
      />
    ) : (
      <Spinner />
    );

  return (
    <Grid container align="center">
      {content}
    </Grid>
  );
}

UserList.prototypes = {
  userList: PropTypes.array.isRequired,
  loadUserList: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  firebase: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    userList: state.userList,
    firebase: state.firebase,
  };
}

const mapDisPatchToProps = {
  loadUserList,
  deleteUser,
  saveUser,
};

export default connect(mapStateToProps, mapDisPatchToProps)(UserList);
