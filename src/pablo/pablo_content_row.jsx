import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export default function PabloContentRow({ children }) {
  return (
    <Box
      display={"flex"}
      marginTop={2}
      marginBottom={3}
      justifyContent={"center"}
      alignItems={"center"}
      flexWrap={"wrap"}
    >
      {children}
    </Box>
  );
}
PabloContentRow.propTypes = {
  children: PropTypes.node.isRequired,
};
