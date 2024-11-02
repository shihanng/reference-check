import { useState } from "react";
import { GASClient } from "gas-client";
import * as server from "./server/main";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import CellLink from "./components/CellLink";
import CellValue from "./components/CellValue";

const { serverFunctions } = new GASClient<typeof server>();

function App() {
  const [cell, setCell] = useState<server.Cell | undefined>();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const cell = await serverFunctions.getSelectedCell();
    setCell(cell);
    setLoading(false);
  };

  return (
    <div className="m-2">
      <div className="flex w-full items-center">
        <div className="pr-2">
          <Button
            loading={loading}
            color="primary"
            onClick={handleClick}
            size="sm"
            variant="soft"
          >
            Show
          </Button>
        </div>
        <Divider orientation="vertical" />
        <div className="pl-2 flex truncate overflow-hidden">
          <CellLink cell={cell} />
        </div>
      </div>
      <CellValue>{cell?.formula ? cell.formula : cell?.value}</CellValue>
    </div>
  );
}

export default App;
