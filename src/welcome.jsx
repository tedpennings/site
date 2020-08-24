import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function Welcome() {
  return (
    <Box component="section" mt={3}>
      <Typography variant="h2">Welcome!</Typography>
      <Typography>
        This website has various writings and examples of data visualization
        techniques using React. It also includes examples of how to test those
        visualizations &mdash; to support presenting those visualizations as
        part of a serious product.
      </Typography>
    </Box>
  );
}
