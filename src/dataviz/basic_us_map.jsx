import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExternalLink from "../common/external_link";

const useStyles = makeStyles((theme) => ({
  em: {
    ...theme.nobotoWeights.medium,
  },
}));

export default function BasicUSMap() {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h1" color="error" paragraph>
        In Progress
      </Typography>
      <Typography variant="h2" paragraph>
        Basic US Map
      </Typography>
      <Box>
        <Typography paragraph>
          This is a basic map visualization &mdash; a basic spatial
          visualization where we show a dimension of data across a geography.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4" paragraph>
          Compile the assets
        </Typography>
        <Typography paragraph>
          There are two basic ingredients, a{" "}
          <Typography component="span" className={classes.em}>
            map vector image
          </Typography>{" "}
          and a{" "}
          <Typography component="span" className={classes.em}>
            data set
          </Typography>
          .
        </Typography>
        <Typography paragraph>
          The images are often the easy part. Wikipedia has some amazing maps
          for{" "}
          <ExternalLink href="https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg">
            the US
          </ExternalLink>{" "}
          and for{" "}
          <ExternalLink href="https://en.wikipedia.org/wiki/File:BlankMap-World.png">
            the world
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink href="https://en.wikipedia.org/wiki/Wikipedia:Blank_maps">
            more
          </ExternalLink>
          . It's also worth considering projections of the earth, political
          boundaries, etc.
        </Typography>
        <Typography paragraph>
          For the data set, I'm going to use infant mortality rates. When I lost
          my son Pablo, I assumed it was unusual and an aberration. It turns out
          it happens more often than you'd think, as you can see below. The US
          CDC provides{" "}
          <ExternalLink href="https://www.cdc.gov/nchs/data/nvsr/nvsr69/NVSR-69-7-508.pdf#page=15&zoom=100,0,0">
            infant mortality reports
          </ExternalLink>
          , broken down by state, among other axes. This will need to be
          translated from PDF text form into JSON (or similar). There are often
          other ways to get this data, like{" "}
          <ExternalLink href="https://data.gov">data.gov</ExternalLink> and{" "}
          <ExternalLink href="https://wonder.cdc.gov">
            wonder.cdc.gov
          </ExternalLink>
          . I found the same data from that PDF on wonder.cdc.gov, downloaded
          the tab-separated data and found{" "}
          <ExternalLink href="https://shancarter.github.io/mr-data-converter/">
            a converter
          </ExternalLink>{" "}
          to make it JSON. Done.
        </Typography>
      </Box>
    </Box>
  );
}
