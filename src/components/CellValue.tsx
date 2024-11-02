import { Box, Typography } from "@mui/joy";
import { ReactNode } from "react";

interface CellValueProps {
  children: ReactNode;
}

function CellValue({ children }: CellValueProps) {
  return (
    <Box
      sx={{
        bgcolor: "neutral.100",
        boxShadow: 1,
        borderRadius: 8,
        p: 2,
        my: 1,
      }}
    >
      <Typography level="body-md">
        <div className="truncate overflow-hidden">{children}</div>
      </Typography>
    </Box>
  );
}

export default CellValue;
