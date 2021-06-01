import React from "react";

import { Code, GitHub, LinkedIn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ConsolidatedLink from "./common/consolidated_link";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    opacity: 0.3,
    transition: "opacity 300ms",
    "&:hover": {
      opacity: 1,
    },
  },
  link: {
    marginRight: theme.spacing(1),
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footerContainer}>
      <ConsolidatedLink
        className={classes.link}
        href="https://github.com/tedpennings/site"
        aria-label="Code for this site"
      >
        <Code alt="Code icon" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://github.com/tedpennings"
        aria-label="My GitHub"
      >
        <GitHub alt="GitHub icon" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://www.linkedin.com/in/tedpennings/"
        aria-label="My LinkedIn"
      >
        <LinkedIn alt="LinkedIn icon" />
      </ConsolidatedLink>
    </div>
  );
}
