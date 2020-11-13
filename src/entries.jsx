import React from "react";
import { Alert } from "@material-ui/lab";
import { Box, Typography } from "@material-ui/core";
import { Switch, Route, useLocation } from "react-router-dom";

import { dataviz, performance } from "./routes";

import Welcome from "./welcome";
import DataViz from "./dataviz_section.mdx";

export default function Entries() {
  const location = useLocation();
  return (
    <Box mt={1}>
      {!location.pathname.includes("/pablo") && (
        <Box mb={2}>
          <Alert severity="error" variant="filled">
            <Typography>
              In Progress! I&apos;m actively working on this; please check back
              soon! 🚀
            </Typography>
          </Alert>
        </Box>
      )}
      <Switch>
        <Switch path="/testing" />
        <Switch path="/dataviz">
          {dataviz.map(renderRoute)}
          <Route component={DataViz} />
        </Switch>
        <Switch path="/performance">
          {performance.map(renderRoute)}
          <Route component={() => <p>TODO section page</p>} />
        </Switch>
        <Route
          path="/pablo"
          component={React.lazy(() =>
            import(/* webpackMode: "lazy" */ "./pablo")
          )}
        />
        <Route component={Welcome} />
      </Switch>
    </Box>
  );
}

const renderRoute = ({ path, component }) => (
  <Route key={path} component={component} path={path} />
);
