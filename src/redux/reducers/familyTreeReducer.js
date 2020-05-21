import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function familyTreeReducer(
  state = initalState.familyTree,
  action
) {
  switch (action.type) {
    case types.LOAD_FAMILY_TREE_SUCCESS:
      return action.familyTree;
    default:
      return state;
  }
}
