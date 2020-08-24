import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    // 120 frames from 0 -> 1 -> 0.81, ideally 2s at 60fps
    let frame = 0;
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
    let mouseX = e.clientX; // default to mousemove

    if (e.touches?.length) {
      // it's a touch (mobile)
      mouseX = e.touches[0].clientX;
    }

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

  return (
    <Box>
      <Typography
        onMouseMove={trackMouse}
        onTouchMove={trackMouse}
        onMouseOut={onMouseOut}
        display="inline"
        component={Link}
        to="/"
        color="primary"
        style={{
          fontVariationSettings,
          textDecoration: "none",
        }}
        variant="h1"
      >
        Ted Pennings
      </Typography>
    </Box>
  );
}
