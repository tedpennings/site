import React from "react";
import { BarChart, Map, Speed, Tune } from "@material-ui/icons";

export const main = [
  {
    path: "/dataviz",
    name: "Data Visualization",
    icon: BarChart,
  },
  {
    path: "/performance",
    name: "Performance",
    icon: Speed,
  },
  {
    path: "/testing",
    name: "Testing",
    icon: Tune,
  },
];

export const dataviz = [
  {
    path: "/dataviz/basic-us-map",
    name: "Basic US Map",
    icon: Map,
    component: React.lazy(() =>
      import(/* webpackMode: "lazy" */ "./dataviz/basic_us_map")
    ),
  },
];

export default { dataviz };
