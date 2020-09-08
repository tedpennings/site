import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CryingAudio from "./crying_audio";
import PabloImage from "./pablo_image";

import pabloBirthPhoto1 from "./birth-1.jpeg";
import pabloBirthPhoto2 from "./birth-2.jpeg";

const NARROW_BREAKPOINT = "1280px";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: ${NARROW_BREAKPOINT})`]: {
      flexDirection: "column",
    },
  },
  audio: {
    marginLeft: theme.spacing(4),
    height: theme.spacing(40),
    width: "100%",
    maxWidth: theme.spacing(40),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [`@media (max-width: ${NARROW_BREAKPOINT})`]: {
      height: theme.spacing(25),
      marginLeft: 0,
    },
  },
}));

export default function BirthPhotoCrying() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box textAlign="center">
        <Box display="flex" mb={1} flexWrap="wrap" justifyContent="center">
          <PabloImage
            orientation="portrait"
            src={pabloBirthPhoto1}
            alt="Pablo with his eyes closed, arms out, looking relaxed after he was born."
          />
          <PabloImage
            orientation="portrait"
            src={pabloBirthPhoto2}
            alt="Pablo holding my finger."
          />
        </Box>
        <Typography variant="caption">
          Pablo immediately after he was born.
        </Typography>
      </Box>
      <Box className={classes.audio}>
        <CryingAudio />
      </Box>
    </Box>
  );
}
