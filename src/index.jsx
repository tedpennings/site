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

window.loadingProfile = null;
window.loadingProfileStart = null;
window.loadingProfileEnd = null;

if ("Profiler" in window) {
  const duration = 1500;
  window.loadingProfileStart = window.performance.now();
  window.loadingProfileEnd = window.loadingProfileStart + duration;
  const profiler = new window.Profiler({
    sampleInterval: 10,
    maxBufferSize: 10000,
  });
  setTimeout(async () => {
    window.loadingProfile = await profiler.stop();
    console.log("Profile complete", window.loadingProfile);
  }, duration);
}

const PabloPage = React.lazy(() =>
  import(/* webpackChunkName: "pablos_page", webpackPrefetch: true */ "./pablo")
);
const MdxFixture = React.lazy(() =>
  import(
    /* webpackChunkName: "mdx_fixture" */ "./common/mdx_rendering.fixture.mdx"
  )
);
const ProfilerPage = React.lazy(() =>
  import(/* webpackChunkName: "profiler_page" */ "./profiler")
);

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
            <Route path="/mdx-fixture">
              <ContentPage>
                <MdxFixture />
              </ContentPage>
            </Route>
            <Route path="/profiler">
              <ContentPage>
                <ProfilerPage />
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
