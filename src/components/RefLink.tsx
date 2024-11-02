import { Chip, Link, Typography } from "@mui/joy";
import { GASClient } from "gas-client";
import * as server from "../server/main";

const { serverFunctions } = new GASClient<typeof server>();

interface RefLinkProps {
  reference?: server.Ref;
}

function RefLink({ reference }: RefLinkProps) {
  if (!reference) {
    return (
      <Typography level="body-sm" className="truncate w-full">
        Select a cell
      </Typography>
    );
  }

  const handleClick = async () => {
    await serverFunctions.gotoRef({
      sheet: reference.sheet,
      a1Notation: reference.a1Notation,
    });
  };

  return (
    <>
      <Chip color="success" size="sm" variant="outlined" onClick={handleClick}>
        {reference.sheet}
      </Chip>
      <div className="ml-1 inline">
        <Link
          level="body-sm"
          underline="hover"
          component="button"
          onClick={handleClick}
        >
          {reference.a1Notation}
        </Link>
      </div>
    </>
  );
}

export default RefLink;
