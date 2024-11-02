import { Chip, Link, Typography } from "@mui/joy";
import { GASClient } from "gas-client";
import * as server from "../server/main";

const { serverFunctions } = new GASClient<typeof server>();

interface CellLinkProps {
  cell?: server.Cell;
}

function CellLink({ cell }: CellLinkProps) {
  if (!cell) {
    return (
      <Typography level="body-sm" className="truncate w-full">
        Select a cell
      </Typography>
    );
  }

  const handleClick = async () => {
    await serverFunctions.gotoRef({
      sheet: cell.sheet,
      a1Notation: cell.a1Notation,
    });
  };

  return (
    <>
      <Chip color="success" size="sm" variant="outlined" onClick={handleClick}>
        {cell.sheet}
      </Chip>
      <div className="ml-1 inline">
        <Link
          level="body-sm"
          underline="hover"
          component="button"
          onClick={handleClick}
        >
          {cell.a1Notation}
        </Link>
      </div>
    </>
  );
}

export default CellLink;
