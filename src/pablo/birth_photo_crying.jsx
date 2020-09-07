import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ZoomableImage from "../common/zoom_image";

import CryingAudio from "./crying_audio";

import pabloBirthPhoto1 from "./IMG_2462.jpeg";
import pabloBirthPhoto2 from "./IMG_2466.jpeg";

const LANDSCAPE_ASPECT_RATIO = 3024 / 4032;
// const PORTRAIT_ASPECT_RATIO = 4032/ 3024 ;

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
  portrait: {
    height: theme.spacing(40),
    width: theme.spacing(40 * LANDSCAPE_ASPECT_RATIO),
    marginRight: theme.spacing(2),
    boxShadow: theme.shadows[4],
  },
  audio: {
    marginLeft: theme.spacing(4),
    height: theme.spacing(40),
    width: theme.spacing(40),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [`@media (max-width: ${NARROW_BREAKPOINT})`]: {
      height: theme.spacing(25),
    },
  },
}));

export default function BirthPhotoCrying() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box textAlign="center">
        <Box display="flex" mb={1}>
          <ZoomableImage
            imageClassName={classes.portrait}
            src={pabloBirthPhoto1}
            alt="Pablo with his eyes closed, arms out, looking relaxed after he was born."
          />
          <ZoomableImage
            imageClassName={classes.portrait}
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
