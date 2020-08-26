/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Link as MuiLink } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useTheme } from "@material-ui/core/styles";

export default function ConsolidatedLink({
  children,
  href,
  to,
  weight,
  ...props
}) {
  const theme = useTheme();
  const destination = href || to || "";
  const linkProps = destination.match(/[a-z]{3,}:\/\//)
    ? {
        href: destination,
        rel: "noopener noreferrer",
        target: "_blank",
      }
    : {
        to: destination,
        component: RouterLink,
      };
  return (
    <MuiLink style={theme.nobotoWeights[weight]} {...linkProps} {...props}>
      {children}
    </MuiLink>
  );
}

// Intentionally different from MUI font weight because
// Noboto doesn't support numeric weights, like, 500.
// Well, it could, but I haven't setup the theme to do the math.
ConsolidatedLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  to: PropTypes.string,
  weight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
};
ConsolidatedLink.defaultProps = {
  weight: "regular",
};
