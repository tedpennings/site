import React, { useState } from "react";
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
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  root: {
    display: "grid",
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
      padding: theme.spacing(4, 0),
      width: "60%",
      "& $heading": {
        marginTop: -1,
        marginBottom: theme.spacing(2),
        paddingTop: 0,
      },
    },
  },
  heroOuter: { background: "#07345F", padding: theme.spacing(2) },
  heroInner: { background: "#D7FBED", padding: theme.spacing(2) },
  heroImage: { objectFit: "cover", width: "100%" },
  main: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    background: "#07345F",
    marginTop: "15%",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 2, 2, 4),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    padding: theme.spacing(2, 4),
  },
  footer: {
    marginTop: "auto", // bottom
  },
}));

export default function App() {
  const [ready, setReady] = useState(false);
  const classes = useStyles();
  return (
    <Fade in={ready} timeout={1000}>
      <div className={classes.container}>
        <div className={classes.root} data-test-id="root">
          <div className={classes.heroOuter}>
            <div className={classes.heroInner}>
              <img
                className={classes.heroImage}
                src={me2021}
                alt="Ted in front of a colorful mural"
                onLoad={() => {
                  setReady(true);
                }}
              />
            </div>
          </div>
          <div className={classes.main}>
            <div className={classes.heading}>{ready && <Name />}</div>
            <div className={classes.content}>
              <div>
                <Landing />
              </div>
              <div className={classes.footer}>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
