import React from "react";
import ReactDOM from "react-dom/client";
import "./options.css";

const Test = () => (
  <div>
    <p className="text-pink-500">Hello world</p>
  </div>
);

const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
