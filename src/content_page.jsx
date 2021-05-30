import React from "react";
import PropTypes from "prop-types";

export default function ContentPageWrapper({ children }) {
  return <div>{children}</div>;
}
ContentPageWrapper.propTypes = { children: PropTypes.node.isRequired };
