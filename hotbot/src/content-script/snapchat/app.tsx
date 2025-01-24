import React, { useState } from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Select from "react-select";

import {
  HOTBOT_CONTENT_ELEMENT_ID,
  PORTAL_CONTAINER_ID,
} from "@/src/lib/constant";

const App = () => {
  const [show, setShow] = useState(false);
  const container = document.querySelector(`#${HOTBOT_CONTENT_ELEMENT_ID}`);
  const element = container.shadowRoot;

  const cache = createCache({
    container: element,
    key: "test",
    prepend: false,
  });

  // useEffect(() => {
  //   retargetEvents(element);
  // }, []);

  return (
    <>
      <div className="relative z-[2147483666]">
        <CacheProvider value={cache}>
          <Select
            menuIsOpen
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
        </CacheProvider>
      </div>
      <div className="fixed z-[21474836661]" id={PORTAL_CONTAINER_ID}></div>
    </>
  );
};

export default App;
