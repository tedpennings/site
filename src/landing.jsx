import React, { useState } from "react";
import PropTypes from "prop-types";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import me2021 from "./assets/me-2021.jpg";
import Name from "./name";
import Landing from "./landing.mdx";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: "1 1 100%",
    justifyContent: "center",
  },
  root: {
    display: "grid",
    alignItems: "center",
    gridTemplateColumns: "7fr 5fr",
    "@media(min-width: 1024px)": {
      width: 975,
    },
    "@media(min-width: 1280px)": {
      width: 1080,
    },
    "@media(min-width: 1600px)": {
      width: 1280,
    },
    // smaller screens see a polaroid-like layout
    "@media(max-width: 1023px)": {
      display: "flex",
      flexDirection: "column",
      minWidth: 250,
      paddingTop: theme.spacing(4),
      width: "85%",
      "& $heading": {
        // make heading look like a polaroid label
        marginTop: -1,
        marginBottom: theme.spacing(2),
        paddingTop: 0,
      },
      "& $footer": {
        marginTop: theme.spacing(1),
      },
    },
  },
  heroOuter: {
    background: theme.palette.hero.outer,
    padding: theme.spacing(2),
  },
  heroInner: {
    background: theme.palette.hero.inner,
    padding: theme.spacing(2),
  },
  heroImage: { objectFit: "cover", width: "100%" },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  heading: {
    background: theme.palette.hero.outer,
    marginTop: "15%",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 2, 2, 4),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 4, 1, 4),
  },
  footer: {
    marginTop: "auto", // bottom
  },
}));

export default function App() {
  const [ready, setReady] = useState(false);
  const classes = useStyles();
  return (
    <Fade appear in={ready} timeout={1000}>
      <div className={classes.container}>
        <div className={classes.root} data-test-id="root">
          <div className={classes.heroOuter}>
            <div className={classes.heroInner}>
              <img
                className={classes.heroImage}
                data-test-id="photo"
                src={me2021}
                alt="Ted in front of a colorful mural"
                onLoad={() => {
                  setReady(true);
                }}
              />
            </div>
          </div>
          <div className={classes.main}>
            <div className={classes.heading} data-test-id="heading">
              {ready && <Name />}
            </div>
            <div className={classes.content}>
              <div>
                <Landing />
              </div>
              <OptimizedFooter className={classes.footer} ready={ready} />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

function OptimizedFooter({ className, ready }) {
  // This is a hack to push the Footer JSX work into the next
  // animation frame. The footer is expensive (MDX+MUI styles)
  // so it's worth it to push it to the second render.
  // The delay is imperceptible because it's in a 1s fade.
  return (
    <div className={className}>
      <Fade in={ready} timeout={16} mountOnEnter>
        <Footer />
      </Fade>
    </div>
  );
}
OptimizedFooter.propTypes = {
  className: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};
