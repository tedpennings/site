import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";

import mdxComponents from "./common/mdx_components";
import { ZoomImageContainer } from "./common/zoom_image";
import theme from "./theme";
import App from "./app";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <ZoomImageContainer>
          <App />
        </ZoomImageContainer>
      </BrowserRouter>
    </MDXProvider>
  </ThemeProvider>,
  document.getElementById("app")
);
