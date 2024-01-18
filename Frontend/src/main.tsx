import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import ContextProvider from "./Context/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
