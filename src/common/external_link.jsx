import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function ExternalLink({ weight, ...props }) {
  const theme = useTheme();
  return (
    <Link
      style={theme.nobotoWeights[weight]}
      target="_blank"
      rel="noopener noreferrer"
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
