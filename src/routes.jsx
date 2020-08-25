import React from "react";
import { BarChart, EmojiPeople, Map, Tune } from "@material-ui/icons";

import Welcome from "./welcome"; // do not codesplit welcome, on the front page

export const main = [
  {
    path: "/welcome",
    name: "Welome!",
    component: <Welcome />,
    icon: EmojiPeople,
  },
  {
    path: "/dataviz",
    name: "Data Visualization",
    component: <Welcome />,
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
    component: React.lazy(() => import("./dataviz/basic_us_map")),
  },
];
