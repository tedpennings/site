import React from "react";
import { Alert } from "@material-ui/lab";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import { dataviz } from "./routes";

import Sitemap from "./sitemap";

export default function Entries() {
  return (
    <Box mt={2}>
      <Alert severity="info" variant="filled">
        Under construction
      </Alert>
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
