import React from "react";
import PropTypes from "prop-types";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ConsolidatedLink from "./common/consolidated_link";
import SuspenseLoader from "./suspense_loader";
import me2021 from "./assets/me-2021.jpg";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
  },
  header: {
    background: theme.palette.hero.outer,
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  headerImage: {
    height: theme.spacing(7),
    width: 70, // based on aspect ratio
    // TODO use netlify cdn for compression
    objectFit: "cover",
    border: `${theme.spacing(1)}px solid ${theme.palette.hero.inner}`,
    marginRight: theme.spacing(2),
  },
}));

export default function ContentPageWrapper({ children }) {
  const classes = useStyles();
  return (
    <Container classes={{ root: classes.contentWrapper }}>
      <ConsolidatedLink
        to="/"
        className={classes.header}
        color="secondary"
        data-test-id="navigation-heading"
        role="navigation"
      >
        <img
          className={classes.headerImage}
          src={me2021}
          alt="Ted in front of a colorful mural"
        />
        <Typography variant="h3" color="inherit">
          Ted Pennings
        </Typography>
      </ConsolidatedLink>
      <SuspenseLoader>{children}</SuspenseLoader>
    </Container>
  );
}
ContentPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
