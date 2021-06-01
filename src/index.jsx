import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";

import mdxComponents from "./common/mdx_components";
import { ZoomImageContainer } from "./common/zoom_image";
import theme from "./theme";
import ContentPage from "./content_page";
import Landing from "./landing";

const PabloPage = React.lazy(() => import("./pablo"));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MDXProvider components={mdxComponents}>
      <BrowserRouter>
        <ZoomImageContainer>
          <Switch>
            <Route path="/pablo">
              <ContentPage>
                <PabloPage />
              </ContentPage>
            </Route>
            <Route component={Landing} />
          </Switch>
        </ZoomImageContainer>
      </BrowserRouter>
    </MDXProvider>
  </ThemeProvider>,
  document.getElementById("app")
);
