import React from "react";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Header from "./header";
import Nav from "./nav";
import Main from "./main";
import Sidebar from "./sidebar";

const SMALL_BREAKPOINT = "1024px";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3, 2, 3),
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  body: {
    height: "100%",
    width: "100%",
    display: "flex",
    flex: "1 1 100%",
    [`@media (max-width: ${SMALL_BREAKPOINT})`]: {
      flexDirection: "column",
    },
  },
  main: {
    flex: "1 1 100%",
    flexDirection: "column",
  },
  sidebar: {
    width: theme.spacing(50),
    [`@media (max-width: ${SMALL_BREAKPOINT})`]: {
      width: "100%",
      marginLeft: 0,
    },
    [`@media (max-width: 1280px`]: {
      width: theme.spacing(30),
      marginLeft: 0,
    },
    marginLeft: theme.spacing(2),
    justifySelf: "flex-end",
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box component="header" className={classes.header}>
        <Header />
      </Box>
      <Nav />
      <Box className={classes.body}>
        <Box component="main" className={classes.main}>
          <Main />
        </Box>
        <Box component="aside" className={classes.sidebar}>
          <Sidebar />
        </Box>
      </Box>
    </Box>
  );
}
