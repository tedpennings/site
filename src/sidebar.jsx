import React, { useMemo } from "react";
import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import SidebarContent from "./sidebar_content.mdx";
import ConsolidatedLink from "./common/consolidated_link";

// Force image into bundle to avoid layout twitch
import me2021 from "!!url-loader?limit=409029395329!./assets/me-2021.jpg";

const useStyles = makeStyles((theme) => ({
  photo: {
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(1),
    maxWidth: theme.spacing(35),
    width: "100%",
    [`@media (max-width: 450px)`]: {
      width: "80vw",
      maxWidth: "unset",
    },
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
        src={me2021}
      />
      <SidebarContent />
      <Footer />
    </Box>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Box my={2}>
      <Typography variant="caption" component="footer">
        &copy; <time>{year}</time>
        {" / "}
        <ConsolidatedLink href="https://github.com/tedpennings/site">
          Code
        </ConsolidatedLink>
        {" / "}
        <ConsolidatedLink href="https://github.com/tedpennings/site/blob/main/LICENSE">
          MIT License
        </ConsolidatedLink>
        {" / "}
        <ConsolidatedLink href="https://www.netlify.com/">
          Powered by Netlify
        </ConsolidatedLink>
      </Typography>
    </Box>
  );
}
