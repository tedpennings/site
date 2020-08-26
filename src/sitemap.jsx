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

import routes, { main as mainRoutes } from "./routes";

const useStyles = makeStyles((theme) => ({
  sectionHeading: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  listItem: {
    paddingLeft: theme.spacing(0.5),
  },
  listIcon: {
    minWidth: "unset",
    marginRight: theme.spacing(2),
  },
}));

export default function Sitemap({
  headings = false,
  icons = true,
  sections = Object.keys(routes),
}) {
  const classes = useStyles();
  return (
    <Box>
      {sections.map((section, i) => {
        const sectionRoutes = routes[section];
        const mainEntry = mainRoutes.find((e) => e.key === section);
        let sectionHeading = section;
        if (mainEntry) {
          let icon = false;
          if (mainEntry.icon && icons) {
            const Icon = mainEntry.icon;
            icon = <Icon fontSize="large" />;
          }
          sectionHeading = (
            <>
              {icon} {mainEntry.name}
            </>
          );
        }
        return (
          <Box key={i} mt={3}>
            {headings && (
              <Typography variant="h4" className={classes.sectionHeading}>
                {sectionHeading}
              </Typography>
            )}
            <SectionSitemap sectionRoutes={sectionRoutes} />
          </Box>
        );
      })}
    </Box>
  );
}

Sitemap.propTypes = {
  headings: PropTypes.bool,
  icons: PropTypes.bool,
  sections: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(routes))),
};

function SectionSitemap({ sectionRoutes }) {
  const classes = useStyles();
  return (
    <List dense>
      {sectionRoutes.map(({ path, name, icon: Icon }) => (
        <ListItemLink className={classes.listItem} key={path} to={path}>
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

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}
