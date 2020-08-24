import React from "react";
import { Box } from "@material-ui/core";

import Welcome from "./welcome";
import Entries from "./entries";

export default function Main() {
  return (
    <Box>
      <Welcome />
      <Entries />
    </Box>
  );
}
