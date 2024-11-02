import { List, ListItem } from "@mui/joy";
import { Ref } from "../server/main";
import RefLink from "./RefLink";

interface RefListProps {
  refs: Ref[];
}

function RefList({ refs }: RefListProps) {
  return (
    <List size="sm">
      {refs.map((ref, idx) => {
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
