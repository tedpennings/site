import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import routes from "./routes";

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: "unset",
    marginRight: theme.spacing(1),
  },
}));

export default function Sitemap({ sections = Object.keys(routes) }) {
  return (
    <Box>
      {pickAsArray(routes, sections).map((s, i) => (
        <SectionSitemap key={i} sectionRoutes={s} />
      ))}
    </Box>
  );
}

Sitemap.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(routes))),
};

function SectionSitemap({ sectionRoutes }) {
  const classes = useStyles();
  return (
    <List dense>
      {sectionRoutes.map(({ path, name, icon: Icon }) => (
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
SectionSitemap.propTypes = {
  sectionRoutes: PropTypes.array,
};

function pickAsArray(obj, keys) {
  return keys.map((k) => obj[k]);
}

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}
