import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";

// Note: This requires the Noboto Flex font (in src/assets)
// Constants for Noboto Flex font; see theme.js
// Also see https://opentype.js.org/font-inspector.html
const MIN_WEIGHT = 54;
const MAX_WEIGHT = 322;

const MIN_ASCENDERS = 456;
const MAX_ASCENDERS = 1000;

const MIN_DESCENDERS = 500;
// The descenders/ascenders are clipped by their container. Clipping the top of
// d looks fine, but clipping the bottom of g looks very bad.
const MAX_DESCENDERS = window.navigator.appVersion.includes("Chrome")
  ? 850
  : 585; // Safari and others clip it :(

const MIN_DIACRITICS = -100;
const MAX_DIACRITICS = 100;

const interpolateFontWeight = (scaledInput) =>
  MIN_WEIGHT + scaledInput * (MAX_WEIGHT - MIN_WEIGHT);

const interpolateAscenders = (scaledInput) =>
  MIN_ASCENDERS + scaledInput * (MAX_ASCENDERS - MIN_ASCENDERS);

const interpolateDescenders = (scaledInput) =>
  MIN_DESCENDERS + scaledInput * (MAX_DESCENDERS - MIN_DESCENDERS);

const interpolateDiacritics = (scaledInput) =>
  MIN_DIACRITICS + scaledInput * (MAX_DIACRITICS - MIN_DIACRITICS);

export default function Header() {
  const [position, setPosition] = useState(0); // 0 -> 1
  const [geometry, setGeometry] = useState();
  const theme = useTheme();

  useEffect(() => {
    // Animates 0.2 -> 1 -> 0.8, linearly
    const duration = 2_000; // ms
    let start;
    const animate = (frameTime) => {
      start ||= frameTime;
      const progress = (frameTime - start) / (start + duration);
      if (progress < 0.8) {
        setPosition(progress + 0.2);
        window.requestAnimationFrame(animate);
      } else if (progress <= 1) {
        setPosition(1 - (progress - 0.8));
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, []);

  function determineGeometry(e) {
    // The text element is display:inline so we can't use an
    // observer on it. Instead we'll record it on first hover.
    // TODO this might not be true, but I can't get a ResizeObserver
    // to trigger on it. It would also trigger, theoretically, once
    // per rAF, after it, which could cause an endless loop.
    if (geometry) {
      return geometry;
    }
    const { x: textOffsetX, width: textWidth } =
      e.target.getBoundingClientRect();
    setGeometry({ textOffsetX, textWidth });
    return { textOffsetX, textWidth };
  }

  function trackMouse(e) {
    let mouseX = e.clientX; // default to mousemove

    if (e.touches?.length) {
      // it's a touch event (mobile)
      mouseX = e.touches[0].clientX;
    }

    const { textOffsetX, textWidth } = determineGeometry(e);

    const scaledMouseX = mouseX - textOffsetX;

    // 100 -> 0 -> 100%, where 0 is center
    const newPosition = Math.abs(scaledMouseX / (textWidth / 2) - 1);

    window.requestAnimationFrame(() => setPosition(newPosition));
  }

  function onMouseOut() {
    // Clear in case there is a resize
    setGeometry();
  }

  const fontVariationSettings = `'wght' ${interpolateFontWeight(position)},
       'ASCE' ${interpolateAscenders(position)},
       'DESC' ${interpolateDescenders(position)},
       'DIAC' ${interpolateDiacritics(position)}`;

  return (
    <Box data-test-id="header">
      <Typography
        onMouseMove={trackMouse}
        onTouchMove={trackMouse}
        onMouseOut={onMouseOut}
        component={Link}
        to="/"
        style={{
          color: theme.palette.background.default,
          fontVariationSettings,
          textDecoration: "none",
        }}
        variant="h2"
      >
        Ted Pennings
      </Typography>
    </Box>
  );
}
