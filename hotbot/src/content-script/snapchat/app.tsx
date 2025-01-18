import React from "react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const App = () => {
  return (
    <div className="z-[2147483666]">
      <p className="text-primary">class </p>
      <p className="text-muted">class </p>
      <p className="text-pink-400">Jay</p>
      <p className="text-[#000000]">Kiran</p>
      <Button>AA</Button>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      Copy
    </div>
  );
};

export default App;
