import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import sha512 from "hash.js/lib/hash/sha/512";

import { formatTime } from "../../common/human";

import NoopWorker from "worker-loader!./noop_worker.js";

// import EchoWorker from "worker-loader!./echo_worker.js";
// const echoWorker = new EchoWorker();

import CovidDatasetObject from "../../datasets/covid.json";
import ScatterPlot from "../../common/scatter_plot";
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

const useStyles = makeStyles((theme) => ({
  sampleCountText: {
    ...theme.typography.subtitle1,
    fontSize: "0.75rem",
    display: "flex",
    justifyContent: "flex-end",
  },
}));
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

export default function SerializationBenchmark() {
  const classes = useStyles();
  const results = useRef([]);
  const theme = useTheme();
  const startTime = useRef(window.performance.now());
  const [_, setLastResult] = useState();
  const afterBenchmark = useCallback((timings, name) => {
    timings.forEach((t) =>
      results.current.push({
        x: t[0], // time since origin (page load, not 1970)
        y: t[1], // duration
        name,
      })
    );
    if (
      results.current.length % 50 === 0 ||
      results.current.length === TOTAL_SAMPLES
    ) {
      setLastResult(window.performance.now());
    }
  }, []);

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

  const pointColors = useMemo(() => {
    return SERIES_KEYS.reduce((acc, cur, idx) => {
      acc[cur] = theme.palette.series[idx % theme.palette.series.length];
      return acc;
    }, {});
  }, [theme]);

  return (
    <Box>
      <ScatterPlot
        points={results.current}
        pointColors={pointColors}
        pointTitles={{}}
      />
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
