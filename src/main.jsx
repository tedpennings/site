import React, { Suspense } from "react";
import { Box, CircularProgress } from "@material-ui/core";

import Entries from "./entries";

export default function Main() {
  return (
    <Box>
      <Suspense fallback={<Spinner />}>
        <Entries />
      </Suspense>
    </Box>
  );
}

function Spinner() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress size={60} />
    </Box>
  );
}
