import React from "react";
import FamilyTree from "../FamilyTree/FamilyTree";
import PersonDetails from "../PersonDetails/person-Details";
import EditDetails from "../EditDetails/person-Edit";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Upload from "../UploadImage/uploadImage";
import { useSelector } from "react-redux";
import { ViewMode } from "../../redux/actions/actionTypes";
import { ToastContainer } from "react-toastify";
import UserList from "../Users/UserList";
import UserProfile from "../Users/UserProfile";
import PictureDetails from "../PictureDetails/pictureDetails";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ViewSwitch = (props) => {
  const view = useSelector((state) => state.view);
  switch (view) {
    case ViewMode.SHOW_DETAIL:
      return <PersonDetails />;
    case ViewMode.SHOW_EDIT:
      return <EditDetails />;
    case ViewMode.SHOW_ADD:
      return <EditDetails />;
    case ViewMode.SHOW_UPLOAD:
      return <Upload />;
    case ViewMode.SHOW_USERS:
      return <UserList />;
    case ViewMode.SHOW_PROFILE:
      return <UserProfile />;
    case ViewMode.SHOW_PICTURE_DETAIL:
      return <PictureDetails />;
    default:
      return <FamilyTree />;
  }
};

const AppPresentation = (props) => {
  const classes = useStyles();
  const firebase = useSelector((state) => state.firebase);

  return (
    <div className={classes.root}>
      <Header
        subtitle="Family Archive"
        activePerson={props.activePerson}
        selectedPerson={props.selectedPerson}
        firebase={firebase}
      />
      {ViewSwitch(props)}
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AppPresentation;
