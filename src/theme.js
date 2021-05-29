import {
  createMuiTheme,
  jssPreset,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { create } from "jss";

// Embed font into bundle to prevent fetch delay
// limit is an arbitrarily large number to base64 encode, not link
import NobotoFlex from "!!url-loader?limit=409029395329!./assets/NobotoFlex-VF.ttf";
const jss = create({ ...jssPreset() });
jss
  .createStyleSheet({
    "@global": {
      ".medium-zoom-overlay": { zIndex: 1300 },
      ".medium-zoom-image--opened": { zIndex: 1350 },
      "@font-face": {
        fontFamily: "Noboto Flex",
        src: `url(${NobotoFlex}) format("truetype")`,
      },
    },
  })
  .attach();

// Noboto Flex does not respect normal font-weight settings
// and instead uses variable setting weights.
// Noboto Flex font weights: 54 -> 322
/* Example with variables, https://codepen.io/aardrian/pen/dKrZdd */
const light = {
  fontVariationSettings: "'wght' 150",
};
const regular = {
  fontVariationSettings: "'wght' 180",
};
const medium = {
  fontVariationSettings: "'wght' 250",
};
const bold = {
  fontVariationSettings: "'wght' 322",
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "Noboto Flex, Helvetica",
    body1: { ...regular },
    body2: { ...regular },
    h1: { ...light },
    h2: { ...light },
    h3: { ...medium },
    h4: { ...medium },
    h5: { ...medium },
    h6: { ...bold },
    subtitle1: { ...regular },
    subtitle2: { ...medium },
    button: { ...medium },
    caption: { ...regular },
    overline: { ...regular },
  },
  nobotoWeights: {
    light,
    regular,
    medium,
    bold,
  },
  // 2020: https://coolors.co/f8615a-fc744b-ddcf67-4f695e-5fb4a4-6fffe9-b6dce9-4c4943-685e50
  // 2021: https://coolors.co/07345f-e0f6fc-87c5ea-685e50-4c4943-d7fbed-a63e11
  palette: {
    background: {
      default: "white",
    },
    primary: {
      main: "#07345f",
    },
    secondary: {
      main: "#87c5ea",
    },
    success: {
      main: "#4f695e",
    },
    error: {
      main: "#F8615A",
    },
    warning: {
      main: "#DDCF67",
    },
    info: {
      main: "#5fb4a4",
    },
    text: {
      primary: "#4c4943",
      secondary: "#685e50",
    },
  },
  overrides: {
    MuiLink: {
      root: {
        ...medium,
      },
    },
  },
});

export default responsiveFontSizes(theme);
