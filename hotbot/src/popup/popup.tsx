import React from "react";
import ReactDOM from "react-dom/client";
import styles from "../styles/index.css";

const Test = () => (
  <div>
    <img src="./../icon.png" />
    <p className="text-red-700 ">Hello world</p>
  </div>
);

const rootDiv = document.createElement("div");
rootDiv.id = "root";
document.body.appendChild(rootDiv);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <style>{styles.toString()}</style>
    <Test />
  </React.StrictMode>
);
