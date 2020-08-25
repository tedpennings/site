/* eslint-disable react/prop-types */
import React from "react";

import { Divider, Link, Typography } from "@material-ui/core";
import ExternalLink from "./external_link";

const TypographyFactory = (variant) => {
  const wrapped = (props) => <Typography variant={variant} {...props} />;
  wrapped.displayName = `WrappedTypography(${variant})`;
  return wrapped;
};

function MdxLink(props) {
  const isExternal = (props.href || props.to)?.startsWith("http");
  return isExternal ? <ExternalLink {...props} /> : <Link {...props} />;
}

// Overwrite MdxProvider components to work with Material-UI
// https://mdxjs.com/getting-started/#mdxprovider
export default {
  a: MdxLink,
  p: Typography,
  h1: TypographyFactory("h1"),
  h2: TypographyFactory("h2"),
  h3: TypographyFactory("h3"),
  h4: TypographyFactory("h4"),
  h5: TypographyFactory("h5"),
  h6: TypographyFactory("h6"),
  hr: Divider,
  // TODO strong, em, lists, tables, code
};
