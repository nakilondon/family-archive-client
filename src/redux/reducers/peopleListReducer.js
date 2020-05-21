import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function peopleListReducer(
  state = initalState.peopleList,
  action
) {
  switch (action.type) {
    case types.LOAD_PEOPLE_LIST_SUCCESS:
      return action.peopleList;
    default:
      return state;
  }
}
