import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // FIX: Components re-render twice when <React.StrictMode> is used
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
