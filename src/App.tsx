import { useState } from "react";
import "./App.css";
import { GASClient } from "gas-client";
import * as server from "./server/main";

const { serverFunctions } = new GASClient<typeof server>();

function App() {
  const [cell, setCell] = useState("");

  const handleClick = async () => {
    const sheetData = await serverFunctions.getSelectedCellValue();
    setCell(sheetData);
  };

  return (
    <>
      <div className="card">
        <button onClick={handleClick}>Selected: {cell}</button>
      </div>
    </>
  );
}

export default App;
