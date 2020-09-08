import { combineReducers } from "redux";
import view from "./viewReducer";
import familyTree from "./familyTreeReducer";
import peopleList from "./peopleListReducer";
import personDetails from "./personDetailsReducer";
import selectedPerson from "./selectedPersonReducer";
import personDetailsUpdate from "./personDetailsUpdateReducer";
import imageUpload from "./imageUploadReducer";
import userList from "./userListReducer";
import { reducer as firebase } from "react-redux-firebase";

const rootReducer = combineReducers({
  view,
  familyTree,
  peopleList,
  personDetails,
  selectedPerson,
  personDetailsUpdate,
  imageUpload,
  userList,
  firebase,
});

export default rootReducer;
