import React from "react";
import { Box } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

import { dataviz } from "./routes";

import Welcome from "./welcome";

export default function Entries() {
  return (
    <Box mt={2}>
      <Switch>
        <Switch path="/testing" />
        <Switch path="/dataviz">{dataviz.map(renderRoute)}</Switch>
        <Switch path="/performance" />
        <Route component={Welcome} />
      </Switch>
    </Box>
  );
}

const renderRoute = ({ path, component }) => (
  <Route key={path} component={component} path={path} />
);
