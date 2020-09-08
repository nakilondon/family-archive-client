import * as types from "../actions/actionTypes";
import initalState from "./initialState";

export default function userListReducer(state = initalState.userList, action) {
  switch (action.type) {
    case types.LOAD_USER_LIST_SUCCESS:
      return action.userList;
    default:
      return state;
  }
}
