import React from "react";
import { createRoot } from "react-dom/client";
import { HOTBOT_CONTENT_ELEMENT_ID } from "../utils/constant";
import App from "./app";

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
    // container.attachShadow({ mode: "open" });

    // const target: ShadowRoot | HTMLElement = container.shadowRoot!;

    const root = createRoot(container!);
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
