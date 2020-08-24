import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Switch, Route } from "react-router-dom";

import { dataviz } from "./routes";

const useStyles = makeStyles((theme) => ({
  entryzz: {
    display: "flex",
    textDecoration: "none",
    marginBottom: 0,
    fontStyle: "italic",
    "& > *:first-child": {
      marginRight: theme.spacing(0.25),
    },
  },
}));

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
  const classes = useStyles();
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
