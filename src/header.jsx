import React, { useState, useRef } from "react";
import { Box, Typography } from "@material-ui/core";

// Based on Noboto Flex font definition
const MIN_WEIGHT = 54;
const MAX_WIDTH = 322;
const DEFAULT_WEIGHT = "inherit";

export default function Header() {
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const ref = useRef();

  function trackMouse(e) {
    const {
      x: textOffsetX,
      width: textWidth,
    } = e.target.getBoundingClientRect();
    const mouseX = e.clientX;

    const scaledMouseX = mouseX - textOffsetX;

    const position = Math.abs(scaledMouseX / (textWidth / 2) - 1);

    const newWeight = Math.min(
      MAX_WIDTH,
      Math.max(MAX_WIDTH * position, MIN_WEIGHT)
    );

    setWeight(newWeight);
  }

  function resetMouse() {
    setWeight(DEFAULT_WEIGHT);
  }

  return (
    // TODO link to /
    <Box>
      <Typography
        ref={ref}
        onMouseMove={trackMouse}
        onMouseOut={resetMouse}
        display="inline"
        color="primary"
        style={{
          // Use CSS variable font because normal font weights are set with stops
          // This will be ignored by browsers that don't support variable fonts.
          fontVariationSettings: `'wght' ${weight}`,
        }}
        variant="h1"
      >
        Ted Pennings
      </Typography>
    </Box>
  );
}
