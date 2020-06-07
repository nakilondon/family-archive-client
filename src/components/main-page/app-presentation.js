import React from "react";
import FamilyTree from "../FamilyTree/FamilyTree";
import PersonDetails from "../PersonDetails/person-Details";
import EditDetails from "../EditDetails/person-Edit";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Upload from "../UploadImage";
import { useSelector } from "react-redux";
import { ViewMode } from "../../redux/actions/actionTypes";
import { ToastContainer } from "react-toastify";
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
    default:
      return <FamilyTree />;
  }
};

const AppPresentation = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header
        subtitle="Family Archive"
        activePerson={props.activePerson}
        selectedPerson={props.selectedPerson}
      />
      {ViewSwitch(props)}
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AppPresentation;
