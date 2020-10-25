import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useRafState } from "react-use";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { selection } from "d3-selection";

import NoopWorker from "worker-loader!./noop_worker.js";

// import EchoWorker from "worker-loader!./echo_worker.js";
// const echoWorker = new EchoWorker();

import CovidDatasetObject from "../../datasets/covid.json";
const CovidDatasetJsonText = JSON.stringify(CovidDatasetObject);

const DEFAULT_UNIT_SIZE = 25;
const SAMPLE_COUNT = 25;
const TOTAL_RUN_COUNT = DEFAULT_UNIT_SIZE * SAMPLE_COUNT;

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

function useScales({ width, height, xDomain, yDomain }) {
  return useMemo(() => {
    const xScale = scaleLinear()
      .domain([xDomain[0], xDomain[1]])
      .range([10, width - 10])
      .nice();
    const yScale = scaleLinear()
      .domain([yDomain[0], yDomain[1]])
      .range([height - 10, 10])
      .nice();

    return { xScale, yScale };
  }, [width, height, xDomain, yDomain]);
}

export default function SerializationBenchmark() {
  const theme = useTheme();
  const [{ xDomain, yDomain }, setDomains] = useRafState({
    xDomain: [],
    yDomain: [],
  });
  const results = useRef({ covidObject: [], covidJson: [] });

  const calculateDomains = useCallback(() => {
    let xDomainMin = Number.MAX_SAFE_INTEGER;
    let xDomainMax = Number.MIN_SAFE_INTEGER;
    let yDomainMin = Number.MAX_SAFE_INTEGER;
    let yDomainMax = Number.MIN_SAFE_INTEGER;
    [...results.current.covidObject, ...results.current.covidJson].forEach(
      ([timestamp, duration]) => {
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
      }
    );

    setDomains({
      xDomain: [xDomainMin, xDomainMax],
      yDomain: [yDomainMin, yDomainMax],
    });
  }, [setDomains]);

  const afterBenchmark = useCallback(
    (timings, name) => {
      results.current[name].push(...timings);
      if (
        results.current[name].length === DEFAULT_UNIT_SIZE * SAMPLE_COUNT ||
        results.current[name].length % 20 === 0
      ) {
        // render progress on scatterplot
        // setting domains triggers render
        calculateDomains();
      }
    },
    [calculateDomains]
  );

  useEffect(() => {
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      window.requestIdleCallback(() => {
        afterBenchmark(benchmarkPostMessage(CovidDatasetObject), "covidObject");
        afterBenchmark(benchmarkPostMessage(CovidDatasetJsonText), "covidJson");
      });
    }
  }, [afterBenchmark]);

  const width = 1000;
  const height = 400;

  const { xScale, yScale } = useScales({ width, height, xDomain, yDomain });

  function renderAxes(el) {
    // TODO this is busted. I think I need to write my own axes.
    const xAxis = axisBottom(xScale).ticks(6);
    selection(el).enter().append("g").call(xAxis);
    const yAxis = axisLeft(yScale).ticks(4);
    selection(el).enter().append("g").call(yAxis);
  }

  return (
    <Box>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        ref={renderAxes}
      >
        {results.current.covidObject.map(([timestamp, duration]) => (
          <circle
            key={`object-${timestamp}`}
            r={2.5}
            cx={xScale(timestamp)}
            cy={yScale(duration)}
            fill={theme.palette.series[0]}
          />
        ))}
        {results.current.covidJson.map(([timestamp, duration], i) => (
          <circle
            key={`json-${i}`}
            r={2.5}
            cx={xScale(timestamp)}
            cy={yScale(duration)}
            fill={theme.palette.series[1]}
          />
        ))}
      </svg>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          bgcolor="grey.100"
          borderRadius="borderRadius"
          padding={1}
          width={120}
        >
          <CircularProgress
            variant="static"
            value={(results.current.covidObject.length / TOTAL_RUN_COUNT) * 100}
          />
          <Typography variant="subtitle" component="div" marginTop={1}>
            {results.current.covidObject.length === TOTAL_RUN_COUNT
              ? `${TOTAL_RUN_COUNT} samples`
              : `${results.current.covidObject.length} / ${TOTAL_RUN_COUNT}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
