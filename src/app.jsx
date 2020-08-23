import React from "react";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3, 1, 3),
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
  },
  main: {
    flex: "1 1 100%",
    flexDirection: "column",
  },
  sidebar: {
    width: theme.spacing(50),
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
