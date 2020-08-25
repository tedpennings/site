import React from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import { dataviz } from "./routes";

import Sitemap from "./sitemap";

export default function Entries() {
  return (
    <Box component="section" mt={3}>
      <Switch>
        <Switch path="/testing" />
        <Switch path="/dataviz">{dataviz.map(renderRoute)}</Switch>
        <Switch path="/performance" />
        <Route component={Sitemap} />
      </Switch>
    </Box>
  );
}

const renderRoute = ({ path, component }) => (
  <Route key={path} component={component} path={path} />
);
