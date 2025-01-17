import React from "react";
import { createRoot } from "react-dom/client";
import { HOTBOT_CONTENT_ELEMENT_ID } from "../utils/constant";
import App from "./app";
import styles from "./content-script.css";

const ROOT_ID = HOTBOT_CONTENT_ELEMENT_ID;

const injectReact = (rootId: string): void => {
  try {
    const container = document.createElement("div");
    document.body.appendChild(container);

    if (container) {
      container.id = rootId;
      container.style.position = "inherit";
      container.style.zIndex = "2147483666";
    }
    
    const shadow = container.attachShadow({ mode: "open" });

    // Create and inject style element with Tailwind CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    shadow.appendChild(styleSheet);

    // Create container for React
    const reactContainer = document.createElement("div");
    shadow.appendChild(reactContainer);

    const root = createRoot(reactContainer);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error Injecting React", error);
  }
};

injectReact(ROOT_ID);