import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";

import { dataviz } from "./routes";

export default function Entries() {
  return (
    <Box component="section" mt={3}>
      <Switch>
        <Switch path="/testing" />

        <Switch path="/dataviz">
          <Switch>
            {dataviz.map(({ path, component }) => (
              <Route key={path} component={component} path={path} />
            ))}
          </Switch>
        </Switch>
        <Route component={PlaceholderIndex} />
      </Switch>
    </Box>
  );
}

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}

function PlaceholderIndex() {
  return (
    <>
      <Typography variant="h3">Data visualization</Typography>
      <Typography>
        I'm working on content! Here's what I have so far:
      </Typography>
      <List>
        {dataviz.map(({ path, name, icon }) => {
          const Icon = icon;
          return (
            <ListItemLink key={path} to={path}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ display: "flex" }}>
                {name}
              </ListItemText>
            </ListItemLink>
          );
        })}
      </List>
    </>
  );
}
