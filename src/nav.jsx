import React, { Suspense } from "react";
import { Breadcrumbs, Typography, LinearProgress } from "@material-ui/core";
import { Home, NavigateNext } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

import { main, dataviz } from "./routes";

const useStyles = makeStyles((theme) => ({
  entry: {
    display: "flex",
    textDecoration: "none",
    color: theme.palette.secondary.main,
    marginBottom: 0,
    "& > *:first-child": {
      marginRight: theme.spacing(0.5),
      height: theme.spacing(2.75),
    },
  },
  loading: {
    width: theme.spacing(75),
  },
}));

export default function Nav() {
  const breadcrumbs = useBreadcrumbs();
  const classes = useStyles();
  return (
    <Suspense fallback={<LinearProgress className={classes.loading} />}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Typography component={Link} to="/" className={classes.entry}>
          <Home fontSize="small" />
          Home
        </Typography>
        {renderBreadcrumb(main, breadcrumbs[1], classes.entry)}
        {renderBreadcrumb(dataviz, breadcrumbs[2], classes.entry)}
      </Breadcrumbs>
    </Suspense>
  );
}

function renderBreadcrumb(routeList, breadcrumb, className) {
  const route = routeList.find((r) => r.path === breadcrumb?.match?.path);
  if (!route) {
    return null;
  }
  const Icon = route.icon;
  return (
    <Typography component={Link} to={route.path} className={className}>
      <Icon fontSize="small" /> {route.name}
    </Typography>
  );
}
