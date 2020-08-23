import React from "react";
import { Box, Typography } from "@material-ui/core";

export default function Main() {
  return (
    <Box>
      <Box component="section">
        <Typography variant="h2">Welcome</Typography>
        <Typography>
          There's basically nothing here! This website has been in need of work.
          It's August 2020 and and I hadn't touched this site since 2015!
        </Typography>
      </Box>
      <Box component="section" mt={3}>
        <Typography variant="h2">Coming soon...</Typography>
        <Typography>I plan to add a lot here!</Typography>
        <Box component="section" mt={3}>
          <Typography variant="h3">Data Visualization</Typography>
          <Typography>
            I'm really interested in building data visualizations, both for my
            work, and also for projects at home. I want to build basic analysis
            tools for public health data that's close to my heart, like infant
            mortality rates.
          </Typography>
          <Typography>
            I plan to post small articles about data viz here. I'll start by
            showing how to visualize data on a US map.
          </Typography>
          <Typography variant="h3">Testing</Typography>
          <Typography>
            I'm also interested in how to test data visualizations. I've spoken
            about it before and would like to post examples here.
          </Typography>
          <Typography variant="h3">Browser Performance</Typography>
          <Typography>
            Browser performance fascinates me -- there are so many tools
            available now... and nobody seems to have put them into a cohesive
            product{" "}
            <span role="img" aria-label="head scratch">
              🤔
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
