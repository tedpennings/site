import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
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
      <Alert severity="warning" variant="filled">
        In Progress!
      </Alert>
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
          . You can find lots more elsewhere, lists of earth projections and fun
          projections like the Fuller Projection
          https://commons.wikimedia.org/wiki/File:Fuller_projection.svg
          https://gisgeography.com/map-projection-types/
        </Typography>
        <Typography paragraph>
          You could also use a map library like Google Maps, Leaflet or Open
          Layers. These will usually require that you place a dataviz layer on
          top of the map layer(s). The concepts are the same as this article,
          but you may also need to position the elements in your dataviz layers
          (using points/centroids, bounding boxes, spread radii, etc). These
          libraries do offer flexibility: earth projections, political
          boundaries, toggles for levels of detail, etc.
        </Typography>
        <Typography paragraph>
          In this article we're using an off-the-shelf map that has layers for
          each element in our dataset, so we have a single layer with our map
          vector image and our dataviz element together.
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
