import React from "react";
import { BarChart, Map, Speed, Tune, Whatshot } from "@material-ui/icons";

export const main = [
  {
    key: "dataviz",
    path: "/dataviz",
    name: "Data Visualization",
    icon: BarChart,
  },
  {
    key: "performance",
    path: "/performance",
    name: "Performance",
    icon: Speed,
  },
  {
    key: "testing",
    path: "/testing",
    name: "Testing",
    icon: Tune,
  },
];

export const dataviz = [
  {
    path: "/dataviz/heatmaps",
    name: "Heatmaps",
    icon: Whatshot,
    component: React.lazy(() =>
      import(/* webpackMode: "lazy" */ "./dataviz/heatmaps")
    ),
  },
  {
    path: "/dataviz/basic-us-map",
    name: "Basic Map Visualizations",
    icon: Map,
    component: React.lazy(() =>
      import(/* webpackMode: "lazy" */ "./dataviz/basic_us_map")
    ),
  },
];

export default { dataviz };
