import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

// Constants for Noboto font
const MIN_WEIGHT = 54;
const MAX_WIDTH = 322;

const MIN_ASCENDERS = 456; // Descenders too
const MAX_ASCENDERS = 1000;

const MIN_DIACRITICS = -100;
const MAX_DIACRITICS = 100;

const interpolateFontWeight = (scaledInput) =>
  Math.min(MAX_WIDTH, Math.max(MAX_WIDTH * scaledInput, MIN_WEIGHT));

const interpolateAscenders = (scaledInput) =>
  Math.min(MAX_ASCENDERS, Math.max(MAX_ASCENDERS * scaledInput, MIN_ASCENDERS));

const interpolateDiacritics = (scaledInput) =>
  Math.min(
    MAX_DIACRITICS,
    Math.max(MAX_DIACRITICS * scaledInput, MIN_DIACRITICS)
  );

export default function Header() {
  const [position, setPosition] = useState();
  const [geometry, setGeometry] = useState();

  function determineGeometry(e) {
    // the text element is display: inline so we can't use an
    // observer on it. Instead we'll record it on first hover.
    if (geometry) {
      return geometry;
    }
    const {
      x: textOffsetX,
      width: textWidth,
    } = e.target.getBoundingClientRect();
    setGeometry({ textOffsetX, textWidth });
    return { textOffsetX, textWidth };
  }

  function trackMouse(e) {
    const { textOffsetX, textWidth } = determineGeometry(e);
    const mouseX = e.clientX;

    const scaledMouseX = mouseX - textOffsetX;

    // 100 -> 0 -> 100%, where 0 is center
    const newPosition = Math.abs(scaledMouseX / (textWidth / 2) - 1);

    setPosition(newPosition);
  }

  function onMouseOut() {
    // Clear in case there is a resize
    setGeometry();
  }

  const fontVariationSettings = !position
    ? ""
    : `'wght' ${interpolateFontWeight(position)}, 'ASCE' ${interpolateAscenders(
        position
      )}, 'DESC' ${interpolateAscenders(
        position
      )}, 'DIAC' ${interpolateDiacritics(position)}`;

  // TODO link to /
  return (
    <Box>
      <Typography
        onMouseMove={trackMouse}
        onMouseOut={onMouseOut}
        display="inline"
        component="div"
        color="primary"
        style={{
          // Use CSS variable font because normal font weights are set with stops
          // This will be ignored by browsers that don't support variable fonts.
          fontVariationSettings,
        }}
        variant="h1"
      >
        Ted Pennings
      </Typography>
    </Box>
  );
}
