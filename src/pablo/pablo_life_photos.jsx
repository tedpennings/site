import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PabloImage from "./pablo_image";

import myFavPhoto from "./nicu-1.jpeg";
import pabloAndTed from "./pablo-ted.jpeg";
import fingersPhoto from "./nicu-fingers.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

export default function PabloLifePhotos() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <PabloImage
        src={myFavPhoto}
        alt="My favorite photo of Pablo"
        orientation="landscape"
      />
      <PabloImage
        src={fingersPhoto}
        alt="Pablo holding my fingers"
        orientation="square"
      />
      <PabloImage
        src={pabloAndTed}
        alt="Me holding Pablo"
        orientation="portrait"
      />
    </Box>
  );
}
