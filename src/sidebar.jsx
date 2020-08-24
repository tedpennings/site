import React, { useMemo } from "react";
import { Box, Link, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from "./common/external_link";

import me2020 from "./assets/me-2020.jpg";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    padding: theme.spacing(1, 2, 0, 1),
  },
  photo: {
    width: "100%",
    marginBottom: theme.spacing(1),
    border: `1px solid ${theme.palette.text.secondary}`,
    maxWidth: theme.spacing(35),
  },
  heading: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Sidebar() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const classes = useStyles();
  return (
    <Box className={classes.sidebar}>
      <img className={classes.photo} src={me2020} alt="Ted Pennings" />
      <Typography className={classes.heading} variant="h4" paragraph>
        About Ted
      </Typography>
      <Typography variant="subtitle1" paragraph>
        Ted lives in Portland, Oregon with his partner Jen. Ted works at{" "}
        <ExternalLink href="https://lightstep.com">Lightstep</ExternalLink> as a
        software engineer.
      </Typography>
      <Typography paragraph>
        Ted enjoys gardening and eating vegan desserts.
      </Typography>
      <Typography paragraph>
        Ted and Jen had a son named Pablo who passed away in November 2017{" "}
        <span role="img" aria-label="broken heart">
          💔
        </span>
      </Typography>
      <Typography paragraph display="flex">
        &copy; {year}
        {" / "}
        <ExternalLink href="https://github.com/tedpennings/site">
          Code
        </ExternalLink>
        {" / "}
        <ExternalLink href="https://github.com/tedpennings/site/blob/main/LICENSE">
          License
        </ExternalLink>
      </Typography>
    </Box>
  );
}
