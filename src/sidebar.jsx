import React from "react";
import { Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import SidebarContent from "./sidebar_content.mdx";

// Force image into bundle to avoid layout twitch
import me2020 from "!!url-loader?limit=409029395329!./assets/me-2020.jpg";

const useStyles = makeStyles((theme) => ({
  photo: {
    border: `1px solid ${theme.palette.text.secondary}`,
    marginBottom: theme.spacing(1),
    maxWidth: theme.spacing(35),
    width: "100%",
  },
  sidebar: {
    padding: theme.spacing(1, 2, 0, 1),
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  return (
    <Box className={classes.sidebar} data-test-id="sidebar">
      <img
        data-test-id="photo"
        alt="Ted Pennings"
        className={classes.photo}
        src={me2020}
      />
      <SidebarContent />
    </Box>
  );
}
