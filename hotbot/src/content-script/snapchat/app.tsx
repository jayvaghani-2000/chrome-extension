import React, { useState } from "react";
import { PORTAL_CONTAINER_ID } from "@/src/lib/constant";
import Demo from "./demo";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const App = () => {
  const [show, setShow] = useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <div className="relative z-[2147483666]">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Demo />

        
      </div>
      <div className="fixed z-[21474836661]" id={PORTAL_CONTAINER_ID}></div>
    </>
  );
};

export default App;
