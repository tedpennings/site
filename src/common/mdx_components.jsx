/* eslint-disable react/prop-types, react/display-name */
import React from "react";

import { Box, Divider, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import ConsolidatedLink from "./consolidated_link";

const TypographyFactory = (variant) => {
  const wrapped = (props) => <Typography variant={variant} {...props} />;
  wrapped.displayName = `WrappedTypography(${variant})`;
  return wrapped;
};

function Blockquote({ children }) {
  const theme = useTheme();
  return (
    <Box
      pl={2}
      ml={2}
      pt={2}
      pb={0.5} // The nested paragraph has margin-bottom
      my={4}
      style={{
        borderLeft: `2px solid ${theme.palette.grey[300]}`,
        verticalAlign: "middle",
      }}
    >
      <Typography component="div">{children}</Typography>
    </Box>
  );
}

function InlineCode({ children }) {
  const theme = useTheme();
  return (
    <Typography
      style={{
        fontVariationSettings: "'MONO' 100, 'wght' 175",
        background: theme.palette.grey[200],
        padding: theme.spacing(0.25, 0.75),
      }}
      display="inline"
      component="span"
    >
      {children}
    </Typography>
  );
}

// Overwrite MdxProvider components to work with Material-UI
// https://mdxjs.com/getting-started/#mdxprovider
export default {
  a: ConsolidatedLink,
  p: (props) => <Typography paragraph {...props} />,
  h1: TypographyFactory("h1"),
  h2: TypographyFactory("h2"),
  h3: TypographyFactory("h3"),
  h4: TypographyFactory("h4"),
  h5: TypographyFactory("h5"),
  h6: TypographyFactory("h6"),
  // em, del, strong use html elements and do not require extra styling
  hr: Divider,
  thematicBreak: (props) => <Divider light {...props} />,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  // TODO code block, lists, tables
};
