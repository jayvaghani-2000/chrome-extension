import * as React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import retargetEvents from "react-shadow-dom-retarget-events";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default class ReactSelect extends HTMLElement {
  createMountPoint() {
    this.mountPoint = document.createElement("div");
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(this.mountPoint);
  }

  createCache() {
    return createCache({
      container: this.shadowRoot,
      key: "test",
      prepend: false,
    });
  }

  connectedCallback() {
    // Step 1: Create Shadow and Mountpoint
    this.createMountPoint();

    // Step 2: Create emotion Cache
    const cache = this.createCache();

    // Step 3: Render component with `CacheProvider`
    setTimeout(() => {
      ReactDOM.render(
        <CacheProvider value={cache}>
          <Select
           value={"test"}
            options={[
              {
                value: "test",
                label: "Test 2",
              },
              {
                value: "test2",
                label: "Test",
              },
            ]}
          />
        </CacheProvider>,
        this.mountPoint
      );

      retargetEvents(this.shadowRoot);
    }, 1000);
  }
}

customElements.get("react-select") ||
  customElements.define("react-select", ReactSelect);
