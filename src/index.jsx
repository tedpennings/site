import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";

import theme from "./theme";
import mdxComponents from "./common/mdx_components";
import App from "./app";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MDXProvider components={mdxComponents}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MDXProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
