import React from "react";
import { BarChart, Map, Tune } from "@material-ui/icons";

export const main = [
  {
    path: "/dataviz",
    name: "Data Visualization",
    component: <p>TODO</p>,
    icon: BarChart,
  },
  {
    path: "/testing",
    name: "Testing",
    component: Tune,
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
