import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CryingAudio from "./crying_audio";
import PabloImage from "./pablo_image";
import PabloContentRow from "./pablo_content_row";

import pabloBirthPhoto1 from "./birth-1.jpeg";
import pabloBirthPhoto2 from "./birth-2.jpeg";

const NARROW_BREAKPOINT = "1280px";

const useStyles = makeStyles((theme) => ({
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
    <PabloContentRow>
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
      <Box className={classes.audio}>
        <CryingAudio />
      </Box>
    </PabloContentRow>
  );
}
