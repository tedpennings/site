import React from "react";
import PropTypes from "prop-types";
import { Box, Tooltip, Typography } from "@material-ui/core";
import { InsertPhotoOutlined } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import ConsolidatedLink from "./consolidated_link";

const useStyles = makeStyles((theme) => ({
  caption: {
    color: theme.palette.grey[50],
    ...theme.nobotoWeights.medium,
  },
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

export default function ElectoralCollegeTooltip({
  children,
  href,
  imgSrc,
  source,
}) {
  const classes = useStyles();
  const img = (
    <Box display="flex" flexDirection="column">
      <img className={classes.map} src={imgSrc} alt={children} />
      {source && (
        <Typography
          component="div"
          className={classes.caption}
          variant="caption"
        >
          Source: {source}
        </Typography>
      )}
    </Box>
  );
  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      interactive
      title={
        href ? <ConsolidatedLink href={href}>{img}</ConsolidatedLink> : { img }
      }
    >
      <Typography component="span" color="secondary" className={classes.text}>
        {children} <InsertPhotoOutlined fontSize="inherit" />
      </Typography>
    </Tooltip>
  );
}

ElectoralCollegeTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  source: PropTypes.string,
};
