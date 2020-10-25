import React from "react";

import EchoWorker from "worker-loader!./echo_worker.js";

import CovidDatasetObject from "../../datasets/covid-min.json";
const CovidDatasetJsonText = JSON.stringify(CovidDatasetObject);

console.log({ CovidDatasetObject, CovidDatasetJsonText });

const worker = new EchoWorker();

export default function SerializationBenchmark() {
  worker.postMessage("hi");
  return <p>serialization</p>;
}
SerializationBenchmark.propTypes = {};
