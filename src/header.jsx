import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";

// Constants for Noboto Flex font; see theme.js
const MIN_WEIGHT = 54;
const MAX_WEIGHT = 322;

const MIN_ASCENDERS = 456; // Descenders too
const MAX_ASCENDERS = 1000;

const MIN_DIACRITICS = -100;
const MAX_DIACRITICS = 100;

const interpolateFontWeight = (scaledInput) =>
  Math.min(MAX_WEIGHT, Math.max(MAX_WEIGHT * scaledInput, MIN_WEIGHT));

const interpolateAscenders = (scaledInput) =>
  Math.min(MAX_ASCENDERS, Math.max(MAX_ASCENDERS * scaledInput, MIN_ASCENDERS));

const interpolateDiacritics = (scaledInput) =>
  Math.min(
    MAX_DIACRITICS,
    Math.max(MAX_DIACRITICS * scaledInput, MIN_DIACRITICS)
  );

export default function Header() {
  const [position, setPosition] = useState(0);
  const [geometry, setGeometry] = useState();

  useEffect(() => {
    let frame = 0; // 0.0 -> 1.00
    const animate = () => {
      if (frame < 120) {
        const value = 0.01 * (frame < 100 ? frame : frame - (frame - 100) * 2);
        setPosition(value);
        frame++;
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, []);

  function determineGeometry(e) {
    // The text element is display:inline so we can't use an
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
    const mouseX = e.clientX;

    const { textOffsetX, textWidth } = determineGeometry(e);

    const scaledMouseX = mouseX - textOffsetX;

    // 100 -> 0 -> 100%, where 0 is center
    const newPosition = Math.abs(scaledMouseX / (textWidth / 2) - 1);

    setPosition(newPosition);
  }

  function onMouseOut() {
    // Clear in case there is a resize
    setGeometry();
  }

  const fontVariationSettings = `'wght' ${interpolateFontWeight(position)},
       'ASCE' ${interpolateAscenders(position)},
       'DESC' ${interpolateAscenders(position)},
       'DIAC' ${interpolateDiacritics(position)}`;

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
          fontVariationSettings,
        }}
        variant="h1"
      >
        Ted Pennings
      </Typography>
    </Box>
  );
}
