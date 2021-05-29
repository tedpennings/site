import React from "react";
import { Box, Fade } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import me2021 from "./assets/me-2021.jpg";
import Heading from "./header"; // TODO rename
import Landing from "./landing";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3, 2, 3),
    display: "flex",
    flex: "1 1 100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  heroOuter: { background: "#07345F", padding: theme.spacing(2) },
  heroInner: { background: "#D7FBED", padding: theme.spacing(2) },
  heroImage: { height: "calc(min(60vh, 450px))", width: "auto" },
  content: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(0, 2),
    padding: theme.spacing(2),
    width: "calc(min(45vw, 500px))",
  },
  heading: {
    background: "#07345F",
    marginLeft: theme.spacing(-4),
    marginTop: theme.spacing(-4),
    padding: theme.spacing(3, 2, 2, 4),
    width: "100%",
    marginBottom: theme.spacing(4),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    // Fade allows time for font parsing, etc
    <Fade in timeout={{ enter: 500 }}>
      <Box className={classes.root} data-test-id="root">
        <Box className={classes.heroOuter}>
          <Box className={classes.heroInner}>
            <img
              className={classes.heroImage}
              src={me2021}
              alt="Ted in front of a colorful mural"
            />
          </Box>
        </Box>
        <Box className={classes.content}>
          <Box className={classes.heading}>
            <Heading />
          </Box>
          <Landing />
        </Box>
      </Box>
    </Fade>
  );
}
