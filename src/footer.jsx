import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Code, GitHub, LinkedIn } from "@material-ui/icons";
import ConsolidatedLink from "./common/consolidated_link";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    opacity: 0.4,
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
      >
        <Code alt="Code for this website" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://github.com/tedpennings"
      >
        <GitHub alt="My GitHub" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://www.linkedin.com/in/tedpennings/"
      >
        <LinkedIn alt="My LinkedIn" />
      </ConsolidatedLink>
    </div>
  );
}
