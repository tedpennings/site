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

import { makeStyles } from "@material-ui/core/styles";

import { dataviz } from "./routes";

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: "unset",
    marginRight: theme.spacing(1),
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
      <Typography variant="h3" paragraph>
        Data visualization
      </Typography>
      <Typography>
        I'm working on content! Here's what I have so far:
      </Typography>
      <List>
        {dataviz.map(({ path, name, icon: Icon }) => (
          <ListItemLink key={path} to={path}>
            <ListItemIcon className={classes.listIcon}>
              <Icon />
            </ListItemIcon>
            <ListItemText disableTypography>
              <Typography color="primary" display="inline">
                {name}
              </Typography>
            </ListItemText>
          </ListItemLink>
        ))}
      </List>
    </>
  );
}
