"use client";

import { useState } from "react";
import { writeData, readData } from "@/firebase/db";

export default function TestPage() {
  const [value, setValue] = useState("");
  const [readValue, setReadValue] = useState("");

  const handleWrite = async () => {
    await writeData("demo/message", value);
    alert("Written!");
  };

  const handleRead = async () => {
    const res = await readData("demo/message");
    setReadValue(res ?? "Nothing found");
  };

  return (
    <div>
      <h1>Firebase Test</h1>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />

      <button onClick={handleWrite}>Write</button>
      <button onClick={handleRead}>Read</button>

      <p>Value in DB: {readValue}</p>
    </div>
  );
}
