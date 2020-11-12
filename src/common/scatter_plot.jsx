import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useMeasure } from "react-use";
import { Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { scaleLinear } from "d3-scale";

const X_AXIS_HEIGHT = 24;
const Y_AXIS_WIDTH = 54;
const CANVAS_BUFFER = 10;

const useStyles = makeStyles((theme) => ({
  axisBackground: {
    fill: theme.palette.primary.main,
    fillOpacity: 0.1,
  },
  axisTickText: {
    ...theme.typography.subtitle1,
    fontSize: "0.75rem",
    fill: theme.palette.primary.main,
    pointerEvents: "none",
    userSelect: "none",
  },
}));

export default function ScatterPlot({ points, pointColors }) {
  const theme = useTheme();
  const classes = useStyles();
  const [ref, { height, width }] = useMeasure();

  const { xScale, xTicks, yScale, yTicks } = useScales({
    points,
    height,
    width,
  });

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      flex="1 1 100%"
      height={480}
      width="100%"
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g data-x-axis>
          {height + width > 0 && (
            <rect
              className={classes.axisBackground}
              x={0}
              y={height - X_AXIS_HEIGHT}
              width={width}
              height={X_AXIS_HEIGHT}
              fill={theme.palette.primary.main}
              fillOpacity={0.05}
            />
          )}
          {xTicks
            .filter((t) => xScale(t) > Y_AXIS_WIDTH * 1.25)
            .map((t, idx) => (
              <React.Fragment key={`x-tick-${idx}`}>
                <line
                  key={t}
                  x1={xScale(t)}
                  x2={xScale(t)}
                  y1={height - X_AXIS_HEIGHT}
                  y2={height}
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                />
                <text
                  className={classes.axisTickText}
                  x={xScale(t) + 4}
                  y={height - X_AXIS_HEIGHT + 16}
                >
                  {new Date(
                    window.performance.timeOrigin + t
                  ).toLocaleTimeString()}
                </text>
              </React.Fragment>
            ))}
        </g>
        <g data-y-axis>
          {height > 0 && (
            <rect
              className={classes.axisBackground}
              x={0}
              y={0}
              width={Y_AXIS_WIDTH}
              height={height - X_AXIS_HEIGHT}
            />
          )}
          {yTicks
            .filter((t) => yScale(t) > X_AXIS_HEIGHT * 1.25)
            .map((t, idx) => (
              <React.Fragment key={`y-tick-${idx}`}>
                <line
                  key={t}
                  y1={yScale(t)}
                  y2={yScale(t)}
                  x1={0}
                  x2={Y_AXIS_WIDTH}
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                />

                <text
                  className={classes.axisTickText}
                  x={2}
                  y={yScale(t) - 4}
                  textAnchor="start"
                >
                  {t} ms
                </text>
              </React.Fragment>
            ))}
        </g>
        <g data-results>
          {points.map(({ name, x, y }, idx) => (
            <circle
              className={classes[name]}
              key={`point-${x}-${y}-${idx}`}
              r={2}
              fill={pointColors[name]}
              cx={xScale(x)}
              cy={yScale(y)}
            />
          ))}
        </g>
      </svg>
    </Box>
  );
}
ScatterPlot.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ),
  pointColors: PropTypes.objectOf(PropTypes.string),
  pointTitles: PropTypes.objectOf(PropTypes.string),
};

function useScales({ width, height, points }) {
  const { xDomain, yDomain } = useDomains({ points });
  return useMemo(() => {
    const xScale = scaleLinear()
      .domain(xDomain)
      .range([CANVAS_BUFFER, width - Y_AXIS_WIDTH - CANVAS_BUFFER])
      .nice();
    xScale.clamp();
    const xTicks = xScale.ticks(6);

    const yScale = scaleLinear()
      .domain(yDomain)
      .range([height - X_AXIS_HEIGHT - CANVAS_BUFFER, CANVAS_BUFFER])
      .nice();
    yScale.clamp();
    const yTicks = yScale.ticks(4);

    return { xScale, xTicks, yScale, yTicks };
  }, [width, height, xDomain, yDomain]);
}

function useDomains({ points }) {
  let xDomainMin = Number.MAX_SAFE_INTEGER;
  let xDomainMax = Number.MIN_SAFE_INTEGER;
  let yDomainMin = Number.MAX_SAFE_INTEGER;
  let yDomainMax = Number.MIN_SAFE_INTEGER;

  points.forEach(({ x, y }) => {
    if (x < xDomainMin) {
      xDomainMin = x;
    } else if (x > xDomainMax) {
      xDomainMax = x;
    }
    if (y < yDomainMin) {
      yDomainMin = y;
    } else if (y > yDomainMax) {
      yDomainMax = y;
    }
  });

  return {
    xDomain: [xDomainMin, xDomainMax],
    yDomain: [yDomainMin, yDomainMax],
  };
}
