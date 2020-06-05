import { combineReducers } from "redux";
import view from "./viewReducer";
import familyTree from "./familyTreeReducer";
import peopleList from "./peopleListReducer";
import personDetails from "./personDetailsReducer";
import selectedPerson from "./selectedPersonReducer";
import personDetailsUpdate from "./personDetailsUpdateReducer";
const rootReducer = combineReducers({
  view,
  familyTree,
  peopleList,
  personDetails,
  selectedPerson,
  personDetailsUpdate,
});

export default rootReducer;
