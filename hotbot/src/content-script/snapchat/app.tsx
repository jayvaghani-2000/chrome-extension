import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { PORTAL_CONTAINER_ID } from "@/src/lib/constant";

const App = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="relative z-[2147483666]">
        <p className="text-primary">class </p>
        <p className="text-muted">class </p>
        <p className="text-pink-400">Jay</p>
        <p className="text-[#000000]">Kiran</p>
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          AA
        </Button>
        {show && (
          <Select open>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        )}
        Copy
      </div>
      <div className="fixed z-[21474836661]" id={PORTAL_CONTAINER_ID}></div>
    </>
  );
};

export default App;
