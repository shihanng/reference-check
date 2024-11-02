import { List, ListItem } from "@mui/joy";
import { Cell, extractRefs } from "../server/main";
import RefLink from "./RefLink";

interface RefListProps {
  cell?: Cell;
}

function RefList({ cell }: RefListProps) {
  if (!cell) {
    return null;
  }
  return (
    <List size="sm">
      {extractRefs(cell).map((ref, idx) => {
        return (
          <ListItem key={idx}>
            <RefLink reference={ref} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default RefList;
