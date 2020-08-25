import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { dataviz } from "./routes";

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: "unset",
    marginRight: theme.spacing(1),
  },
}));

export default function Sitemap() {
  const classes = useStyles();
  return (
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
  );
}

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}
