/* eslint-disable react/prop-types, react/display-name */
import React from "react";

import { Box, Divider, Typography } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";

import ConsolidatedLink from "./consolidated_link";

const HeadingFactory = (variant) => {
  const wrapped = (props) => (
    <Box mb={1}>
      <Typography variant={variant} {...props} />
    </Box>
  );
  wrapped.displayName = `MdxHeading(${variant})`;
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
        whiteSpace: "pre",
      }}
      display="inline"
      component="span"
    >
      {children}
    </Typography>
  );
}

const listParentStyles = {
  my: 3,
  ml: 1,
  style: { paddingInlineStart: 0 },
};

const UL = ({ children }) => (
  <Box component="ul" {...listParentStyles}>
    {children}
  </Box>
);
const OL = ({ children }) => (
  <Box component="ol" {...listParentStyles}>
    {children}
  </Box>
);
const LI = ({ children }) => (
  // Do not put <Typography> on children, to <p> inside <p>
  <Box component="li" display="flex">
    <ChevronRight color="secondary" />
    {children}
  </Box>
);

// Overwrite MdxProvider components to work with Material-UI
// https://mdxjs.com/getting-started/#mdxprovider
export default {
  a: ConsolidatedLink,
  p: (props) => <Typography paragraph {...props} />,
  h1: HeadingFactory("h1"),
  h2: HeadingFactory("h2"),
  h3: HeadingFactory("h3"),
  h4: HeadingFactory("h4"),
  h5: HeadingFactory("h5"),
  h6: HeadingFactory("h6"),
  // em, del, strong use html elements and do not require extra styling
  hr: Divider,
  thematicBreak: (props) => <Divider light {...props} />,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  ul: UL,
  ol: OL,
  li: LI,
  // TODO this pre handling sucks
  pre: ({ children }) => (
    <Blockquote>
      <InlineCode>{children}</InlineCode>
    </Blockquote>
  ),
  // TODO code block, lists, tables
};
