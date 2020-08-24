import React from "react";
import { Link } from "@material-ui/core";

export default function ExternalLink(props) {
  return <Link target="_blank" rel="noopener noreferrer" {...props} />;
}
