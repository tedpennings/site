import React from "react";
import { Box, Link, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    padding: theme.spacing(1, 2, 0, 1),
  },
  photo: {
    width: "100%",
    marginBottom: theme.spacing(1),
    border: `1px solid ${theme.palette.text.secondary}`,
    maxWidth: theme.spacing(35),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Box className={classes.sidebar}>
      <img className={classes.photo} src="me-2020.jpg" alt="Ted Pennings" />
      <Typography className={classes.heading} variant="h4">
        About Ted
      </Typography>
      <Typography variant="subtitle1">
        Ted lives in Portland, Oregon with his partner Jen. Ted works at{" "}
        <Link href="https://lightstep.com">Lightstep</Link> as a software
        engineer.
      </Typography>
      <Typography variant="body1">
        Ted enjoys gardening and eating vegan desserts.
      </Typography>
      <Typography variant="body1">
        Ted and Jen had a son named Pablo who passed away in November 2017{" "}
        <span role="img" aria-label="broken heart">
          💔
        </span>
      </Typography>
    </Box>
  );
}
