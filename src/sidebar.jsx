import React, { useMemo } from "react";
import { Box, Divider, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from "./common/external_link";

import me2020 from "./assets/me-2020.jpg";

const useStyles = makeStyles((theme) => ({
  heading: {
    marginBottom: theme.spacing(1),
  },
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
  const year = useMemo(() => new Date().getFullYear(), []);
  const classes = useStyles();
  return (
    <Box className={classes.sidebar}>
      <img alt="Ted Pennings" className={classes.photo} src={me2020} />
      <Typography className={classes.heading} paragraph variant="h4">
        About Ted
      </Typography>
      <Typography paragraph variant="subtitle1">
        Ted lives in Portland, Oregon with his partner Jen. Ted works at{" "}
        <ExternalLink href="https://lightstep.com">Lightstep</ExternalLink> as a
        software engineer.
      </Typography>
      <Typography paragraph>
        Ted enjoys gardening and eating vegan desserts.
      </Typography>
      <Typography paragraph>
        Ted and Jen had a son named Pablo who passed away in November 2017{" "}
        <span aria-label="broken heart" role="img">
          💔
        </span>
      </Typography>
      <Divider />
      <Box mt={2}>
        <Typography>
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
    </Box>
  );
}
