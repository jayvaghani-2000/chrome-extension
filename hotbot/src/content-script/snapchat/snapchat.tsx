import React from "react";
import { createRoot } from "react-dom/client";
import {
  HOTBOT_CONTENT_ELEMENT_ID,
  PORTAL_CONTAINER_ID,
} from "../../lib/constant";
import App from "./app";
import styles from "../../styles/index.css";

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
    styleSheet.textContent = `
      ${styles}
      :host {
        --background: 0 0% 100%;
        --foreground: 222.2 47.4% 11.2%;
        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 222.2 47.4% 11.2%;
        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;
        --card: 0 0% 100%;
        --card-foreground: 222.2 47.4% 11.2%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;
        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;
        --destructive: 0 100% 50%;
        --destructive-foreground: 210 40% 98%;
        --ring: 215 20.2% 65.1%;
        --radius: 0.5rem;
      }
    `;
    shadow.appendChild(styleSheet);

    // Create container for React
    const reactContainer = document.createElement("div");
    shadow.appendChild(reactContainer);

    const root = createRoot(reactContainer);
    root.render(
      <React.StrictMode>
        <App />
        <div className="fixed z-[21474836661]" id={PORTAL_CONTAINER_ID}></div>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error Injecting React", error);
  }
};

injectReact(ROOT_ID);
