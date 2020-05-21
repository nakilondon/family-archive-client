import { combineReducers } from "redux";
import view from "./viewReducer";
import familyTree from "./familyTreeReducer";
import peopleList from "./peopleListReducer";
import personDetails from "./personDetailsReducer";
import selectedPerson from "./selectedPersonReducer";

const rootReducer = combineReducers({
  view,
  familyTree,
  peopleList,
  personDetails,
  selectedPerson,
});

export default rootReducer;
