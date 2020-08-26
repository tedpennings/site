import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Typography } from "@material-ui/core";
import { InsertPhotoOutlined } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import ConsolidatedLink from "../../common/consolidated_link";

import map from "./270-to-win-map.png";

const useStyles = makeStyles((theme) => ({
  map: {
    width: theme.spacing(75),
  },
  tooltip: {
    maxWidth: "unset",
  },
  text: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    "& > svg": {
      marginLeft: theme.spacing(0.5),
    },
  },
}));

export default function ElectoralCollegeTooltip({ children }) {
  const classes = useStyles();
  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      interactive
      title={
        <ConsolidatedLink href="https://270towin.com">
          <img className={classes.map} src={map} />
        </ConsolidatedLink>
      }
    >
      <Typography component="div" color="secondary" className={classes.text}>
        {children} <InsertPhotoOutlined fontSize="inherit" />
      </Typography>
    </Tooltip>
  );
}

ElectoralCollegeTooltip.propTypes = { children: PropTypes.node.isRequired };
