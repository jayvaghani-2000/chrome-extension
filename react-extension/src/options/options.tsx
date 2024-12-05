import React from "react";
import ReactDOM from "react-dom/client";

const Test = () => <div>Hello world from options page!</div>;

const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> 
    <Test />
  </React.StrictMode>
);
