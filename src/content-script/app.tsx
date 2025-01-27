import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { PORTAL_CONTAINER_ID } from '../lib/constant';

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="relative z-[934723864354]">
        <p className="text-primary">class </p>
        <p className="text-muted">class </p>
        <p className="text-pink-400">App</p>
        <p className="text-[#000000]">App</p>
        <Button
          onClick={() => {
            setShow(true);
          }}
        >
          AA
        </Button>
        {show && (
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
        )}
      </div>
      <div className="fixed z-[21474836661]" id={PORTAL_CONTAINER_ID}></div>
    </>
  );
};

export default App;
