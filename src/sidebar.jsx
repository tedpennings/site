import React from "react";
import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    padding: theme.spacing(1, 2, 0, 1),
  },
  photo: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Box className={classes.sidebar}>
      <img className={classes.photo} src="me-2020.jpg" alt="Ted Pennings" />
      <Typography variant="h4">About Ted</Typography>
      <Typography variant="body1">
        Ted lives in Portland, Oregon with his partner Jen. Ted works at
        InVision as a software engineer.
      </Typography>
      <Typography variant="body2">
        Ted enjoys gardening and eating desserts.
      </Typography>
    </Box>
  );
}
