/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Link } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { useTheme } from "@material-ui/core/styles";

export default function ExternalLink({ weight, ...props }) {
  const theme = useTheme();
  return (
    <Link
      rel="noopener noreferrer"
      style={theme.nobotoWeights[weight]}
      target="_blank"
      {...props}
    />
  );
}

// Intentionally different from MUI font weight because
// Noboto doesn't support numeric weights, like, 500.
// Well, it could, but I haven't setup the theme to do the math.
ExternalLink.propTypes = {
  weight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
};
ExternalLink.defaultProps = {
  weight: "regular",
};
