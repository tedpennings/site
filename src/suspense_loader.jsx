import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function SuspenseLoader({ children }) {
  return <Suspense fallback={<div>{paragraphs}</div>}>{children}</Suspense>;
}
SuspenseLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

const paragraphCounts = ["h2", 3, "h3", 2, 4, "h3", 3];

const paragraphs = paragraphCounts.map((count, p) => (
  <Box key={p} mb={3}>
    {typeof count === "string" ? (
      <Typography variant={count}>
        <Skeleton variant="text" animation="wave" />
      </Typography>
    ) : (
      new Array(count)
        .fill()
        .map((_, l) => <Skeleton key={l} variant="text" animation="wave" />)
    )}
  </Box>
));
