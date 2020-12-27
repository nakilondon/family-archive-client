import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/main-page/App";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

registerServiceWorker();
