import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import "./fonts.css";

// Noboto Flex does not respect normal font-weight settings
// and instead uses variable setting weights.
// Noboto Flex font weights: 54 -> 322
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
  // https://coolors.co/ff5154-424b54-ffe75c-90fcf9-fcf7ff-51e181-ff70a6-d6ff79
  palette: {
    background: {
      default: "white",
    },
    primary: {
      main: "#ff70a6",
    },
    secondary: {
      main: "#d6ff79",
    },
    success: {
      main: "#51e181",
    },
    error: {
      main: "#ff5154",
    },
    warning: {
      main: "#ffe75c",
    },
    info: {
      main: "#90fcff9",
    },
    text: {
      primary: "#393424",
      secondary: "#424b54",
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        marginBottom: "0.75rem",
      },
    },
  },
});
console.log(theme);

export default responsiveFontSizes(theme);
