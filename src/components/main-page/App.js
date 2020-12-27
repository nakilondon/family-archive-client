import React from "react";
import AppPresentation from "./app-presentation";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
// redux packages
import { useSelector } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
//import rootReducer from './redux/reducers/rootReducer'

// firebase config
import {
  firebase as fbConfig,
  reduxFirebase as rfConfig,
} from "../Firebase/config";

// firebase packages
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // for firestore
import { isLoaded, isEmpty } from "react-redux-firebase";

import SignUp from "../Authorisation/SignUp";
import SignIn from "../Authorisation/SignIn";
import ResetPassword from "../Authorisation/ResetPassword";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const store = configureStore();
firebase.initializeApp(fbConfig);

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <BrowserRouter basename={baseUrl}>
          <Switch>
            <PrivateRoute path="/secure">
              <AppPresentation />
            </PrivateRoute>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/resetpassword">
              <ResetPassword />
            </Route>
            <Route exact path="/">
              <SignIn />
            </Route>
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
