import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useMeasure, useRafState } from "react-use";
import { Box, LinearProgress, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { scaleLinear } from "d3-scale";
import sha512 from "hash.js/lib/hash/sha/512";

import NoopWorker from "worker-loader!./noop_worker.js";

// import EchoWorker from "worker-loader!./echo_worker.js";
// const echoWorker = new EchoWorker();

import CovidDatasetObject from "../../datasets/covid.json";
const CovidDatasetJsonText = JSON.stringify(CovidDatasetObject);

// Series keys (mostly used to assign colors)
const COVID_JSON = "covid_json";
const COVID_OBJ = "covid_obj";
const SMALL_RANDOM_JSON = "small_random_json";
const SMALL_RANDOM_OBJ = "small_random_obj";
const LARGE_RANDOM_JSON = "large_random_json";
const LARGE_RANDOM_OBJ = "large_random_obj";
const SERIES_KEYS = [
  COVID_JSON,
  COVID_OBJ,
  SMALL_RANDOM_JSON,
  SMALL_RANDOM_OBJ,
  LARGE_RANDOM_JSON,
  LARGE_RANDOM_OBJ,
];

const DEFAULT_UNIT_SIZE = 15;
const DEFAULT_BENCHMARK_RUNS = 100;
const TOTAL_SAMPLES =
  DEFAULT_UNIT_SIZE * DEFAULT_BENCHMARK_RUNS * SERIES_KEYS.length;

const X_AXIS_HEIGHT = 24;
const Y_AXIS_WIDTH = 54;
const CANVAS_BUFFER = 10;

const noopWorker = new NoopWorker();

function benchmarkPostMessage(testSubject) {
  const timings = new Array(DEFAULT_UNIT_SIZE);
  for (let i = 0; i < DEFAULT_UNIT_SIZE; i++) {
    const start = window.performance.now();
    noopWorker.postMessage(testSubject);
    const end = window.performance.now();
    timings[i] = [end, end - start];
  }
  return timings;
}

function randomData(n = 10) {
  return Array(n).fill(1).map(Math.random).map(sha512);
}

function createComplexNewMessage(count) {
  count = count ?? Math.round(Math.random() * 10000);
  const arr = Array(count).fill(1).map(Math.random);

  for (let i = 0; i < count / 2; i++) {
    const idx = (i * Math.random * arr.length) | 1;
    arr[idx] = randomData();
  }

  return arr;
}

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
  sampleCountText: {
    ...theme.typography.subtitle1,
    fontSize: "0.75rem",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function useScales({ width, height, xDomain, yDomain }) {
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

export default function SerializationBenchmark() {
  const theme = useTheme();
  const classes = useStyles();
  const [ref, { height, width }] = useMeasure();

  // TODO this hook should handle scales and just take data as input
  const [{ xDomain, yDomain }, setDomains] = useRafState({
    xDomain: [],
    yDomain: [],
  });
  const results = useRef([]);
  const startTime = useRef(window.performance.now());

  const calculateDomains = useCallback(() => {
    let xDomainMin = Number.MAX_SAFE_INTEGER;
    let xDomainMax = Number.MIN_SAFE_INTEGER;
    let yDomainMin = Number.MAX_SAFE_INTEGER;
    let yDomainMax = Number.MIN_SAFE_INTEGER;

    results.current.forEach(({ timestamp, duration }) => {
      if (timestamp < xDomainMin) {
        xDomainMin = timestamp;
      } else if (timestamp > xDomainMax) {
        xDomainMax = timestamp;
      }
      if (duration < yDomainMin) {
        yDomainMin = duration;
      } else if (duration > yDomainMax) {
        yDomainMax = duration;
      }
    });

    setDomains({
      xDomain: [xDomainMin, xDomainMax],
      yDomain: [yDomainMin, yDomainMax],
    });
  }, [setDomains]);

  const afterBenchmark = useCallback(
    (timings, name) => {
      timings.forEach((t) =>
        results.current.push({
          duration: t[1],
          timestamp: t[0],
          name,
        })
      );
      if (
        results.current.length % 50 === 0 ||
        results.current.length === TOTAL_SAMPLES
      ) {
        calculateDomains();
      }
    },
    [calculateDomains]
  );

  useEffect(() => {
    const smallerMessage = createComplexNewMessage(300);
    const smallerMessageJson = JSON.stringify(smallerMessage);
    const biggerMessage = createComplexNewMessage(15000);
    const biggerMessageJson = JSON.stringify(biggerMessage);
    for (let i = 0; i < DEFAULT_BENCHMARK_RUNS; i++) {
      window.requestIdleCallback(() => {
        afterBenchmark(benchmarkPostMessage(CovidDatasetObject), COVID_OBJ);
        afterBenchmark(benchmarkPostMessage(CovidDatasetJsonText), COVID_JSON);
      });

      window.requestIdleCallback(() => {
        afterBenchmark(benchmarkPostMessage(smallerMessage), SMALL_RANDOM_OBJ);
        afterBenchmark(
          benchmarkPostMessage(smallerMessageJson),
          SMALL_RANDOM_JSON
        );
        afterBenchmark(benchmarkPostMessage(biggerMessage), LARGE_RANDOM_OBJ);
        afterBenchmark(
          benchmarkPostMessage(biggerMessageJson),
          LARGE_RANDOM_JSON
        );
      });
    }
  }, [afterBenchmark]);

  const { xScale, xTicks, yScale, yTicks } = useScales({
    width,
    height,
    xDomain,
    yDomain,
  });

  return (
    <Box>
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
            <rect
              className={classes.axisBackground}
              x={0}
              y={height - X_AXIS_HEIGHT}
              width={width}
              height={X_AXIS_HEIGHT}
              fill={theme.palette.primary.main}
              fillOpacity={0.05}
            />
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
            <rect
              className={classes.axisBackground}
              x={0}
              y={0}
              width={Y_AXIS_WIDTH}
              height={height - X_AXIS_HEIGHT}
            />
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
            {results.current.map(({ name, timestamp, duration }) => (
              <circle
                className={classes[name]}
                key={`result-${name}-${timestamp}`}
                r={2.5}
                fill={theme.palette.series[SERIES_KEYS.indexOf(name)]}
                cx={xScale(timestamp)}
                cy={yScale(duration)}
              />
            ))}
          </g>
        </svg>
      </Box>
      <Box mt={2} mb={2}>
        <Typography className={classes.sampleCountText} component="div">
          {results.current.length.toLocaleString()} samples{" "}
          {results.current.length === TOTAL_SAMPLES
            ? `(${formatTime(
                results.current[results.current.length - 1].timestamp -
                  startTime.current
              )})`
            : `(${Math.round(
                (results.current.length / TOTAL_SAMPLES) * 100
              )}%)`}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(results.current.length / TOTAL_SAMPLES) * 100}
        />
      </Box>
    </Box>
  );
}

function formatTime(millis) {
  if (millis > 90 * 1000) {
    // 90 seconds or longer
    const mins = Math.round(millis / 1000 / 60);
    const sec = Math.round((millis / 1000) % 60);
    return `${mins}m ${sec}s`;
  }
  if (millis > 4 * 1000) {
    // 4 seconds or longer
    return `${Math.round(millis / 1000)}s`;
  }
  return `${Math.round(millis)}ms`;
}
