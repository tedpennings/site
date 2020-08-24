import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

export default function Entries() {
  return (
    <Box component="section" mt={3}>
      <Typography variant="h3">Data visualization</Typography>
      <List>
        <ListItem>
          <ListItemText>TODO: Basic US map visualization</ListItemText>
        </ListItem>
      </List>
    </Box>
  );
}
