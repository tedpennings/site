import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import "./fonts.css";

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
  palette: {
    background: {
      default: "#FCF7FF",
    },
    primary: {
      main: "#FF70A6",
    },
    secondary: {
      main: "#D6FF79",
    },
    success: {
      main: "#f00", // TODO
    },
    error: {
      main: "#FF5154",
    },
    warning: {
      main: "#f00", // TODO
    },
    info: {
      main: "#90FCFF9",
    },
    text: {
      primary: "#393424",
      secondary: "#4B452F",
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
