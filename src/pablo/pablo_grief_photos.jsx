import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PabloImage from "./pablo_image";

import ashesAltar from "./ashes-altar.jpeg";
import heartAshes from "./heart-ashes.jpeg";
import jenTedPeoonies from "./jen-ted-peonies.jpeg";

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

export default function PabloGriefPhotos() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <PabloImage
        src={heartAshes}
        alt="Jen and Ted in a peony field"
        orientation="landscape"
      />
      <PabloImage
        src={ashesAltar}
        alt="Jen and Ted in a peony field"
        orientation="portrait"
      />
      <PabloImage
        src={jenTedPeoonies}
        alt="Jen and Ted in a peony field"
        orientation="landscape"
      />
    </Box>
  );
}
