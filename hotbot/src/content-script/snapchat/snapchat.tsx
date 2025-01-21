import React from "react";
import { createRoot } from "react-dom/client";
import { HOTBOT_CONTENT_ELEMENT_ID } from "../../lib/constant";
import App from "./app";
import styles from "../../styles/index.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";

const ROOT_ID = HOTBOT_CONTENT_ELEMENT_ID;

const injectReact = (rootId: string): void => {
  console.log("!!!!!!!!!!!");
  try {
    const container = document.createElement("div");
    document.body.appendChild(container);

    if (container) {
      container.id = rootId;
      container.className = "dark";
      container.style.position = "inherit";
      container.style.zIndex = "2147483666";
    }

    const shadow = container.attachShadow({ mode: "open" });

    const cache = createCache({
      key: "css",
      prepend: true,
      container: shadow,
    });
    // Create and inject style element with Tailwind CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      ${styles}
      :host {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;
        --muted: 223 47% 11%;
        --muted-foreground: 215.4 16.3% 56.9%;
        --accent: 216 34% 17%;
        --accent-foreground: 210 40% 98%;
        --popover: 224 71% 4%;
        --popover-foreground: 215 20.2% 65.1%;
        --border: 216 34% 17%;
        --input: 216 34% 17%;
        --card: 224 71% 4%;
        --card-foreground: 213 31% 91%;
        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 1.2%;
        --secondary: 222.2 47.4% 11.2%;
        --secondary-foreground: 210 40% 98%;
        --destructive: 0 63% 31%;
        --destructive-foreground: 210 40% 98%;
        --ring: 216 34% 17%;
        --radius: 0.5rem;
      }
    `;
    shadow.appendChild(styleSheet);

    // Create container for React
    const reactContainer = document.createElement("div");

    shadow.appendChild(reactContainer);

    const root = createRoot(reactContainer);
    const shadowTheme = createTheme({
      components: {
        MuiPopover: {
          defaultProps: {
            container: reactContainer,
          },
        },
        MuiPopper: {
          defaultProps: {
            container: reactContainer,
            style: {
              zIndex: 999999999
            }
          },
        },
        MuiModal: {
          defaultProps: {
            container: reactContainer,
          },
        },
      },
    });
    root.render(
      <React.StrictMode>
        <CacheProvider value={cache}>
          <ThemeProvider theme={shadowTheme}>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error Injecting React", error);
  }
};

injectReact(ROOT_ID);
