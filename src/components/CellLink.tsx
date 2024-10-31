import { Chip, Link, Typography } from "@mui/joy";
import * as server from "../server/main";

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

  return (
    <>
      <Chip
        color="success"
        size="sm"
        variant="outlined"
        onClick={() => {
          // ...process something
        }}
      >
        {cell.sheet}
      </Chip>
      <div className="ml-1 inline">
        <Link
          level="body-sm"
          underline="hover"
          component="button"
          onClick={() => {
            // ...process something
          }}
        >
          {cell.value}
        </Link>
      </div>
    </>
  );
}

export default CellLink;
