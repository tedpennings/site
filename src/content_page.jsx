import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import me2021 from "./assets/me-2021.jpg";
import { Typography } from "@material-ui/core";
import ConsolidatedLink from "./common/consolidated_link";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    margin: theme.spacing(5, 0),
  },
  header: {
    background: "#07345F",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  headerImage: {
    height: theme.spacing(7),
    width: 70, // based on aspect // TODO parameterize and use netlify cdn
    objectFit: "cover",
    border: `${theme.spacing(1)}px solid #D7FBED`,
    marginRight: theme.spacing(2),
  },
}));

export default function ContentPageWrapper({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.contentWrapper}>
      <ConsolidatedLink to="/" className={classes.header} color="secondary">
        <img
          className={classes.headerImage}
          src={me2021}
          alt="Ted in front of a colorful mural"
        />
        <Typography variant="h3" color="inherit">
          Ted Pennings
        </Typography>
      </ConsolidatedLink>
      {children}
    </div>
  );
}
ContentPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
