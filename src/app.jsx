import React, { useState } from "react";
import { Fade } from "@material-ui/core";
import { Code, GitHub, LinkedIn } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import me2021 from "./assets/me-2021.jpg";
import Heading from "./header"; // TODO rename
import Landing from "./landing";
import ConsolidatedLink from "./common/consolidated_link";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flex: "1 1 100%",
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    padding: theme.spacing(3, 3, 2, 3),
    display: "grid",
    gridTemplateColumns: "7fr 5fr",
    width: "calc(min(100%, 1280px))",
  },
  heroOuter: { background: "#07345F", padding: theme.spacing(2) },
  heroInner: { background: "#D7FBED", padding: theme.spacing(2) },
  heroImage: { objectFit: "cover", width: "100%" },
  main: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(0, 2),
    padding: theme.spacing(2),
  },
  heading: {
    background: "#07345F",
    position: "relative",
    left: theme.spacing(-4),
    width: `calc(100% + ${theme.spacing(4)}px)`,
    marginTop: "15%",
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3, 2, 2, 4),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    paddingRight: theme.spacing(2),
  },
  footer: {
    marginTop: "auto",
    opacity: 0.4,
    transition: "opacity 300ms",
    "&:hover": {
      opacity: 1,
    },
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
            <div className={classes.heading}>{ready && <Heading />}</div>
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

const useFooterStyles = makeStyles((theme) => ({
  link: {
    marginRight: theme.spacing(1),
  },
}));
function Footer() {
  const classes = useFooterStyles();
  return (
    <div>
      <ConsolidatedLink
        className={classes.link}
        href="https://github.com/tedpennings/site"
      >
        <Code alt="Code for this website" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://github.com/tedpennings"
      >
        <GitHub alt="My GitHub" />
      </ConsolidatedLink>
      <ConsolidatedLink
        className={classes.link}
        href="https://www.linkedin.com/in/tedpennings/"
      >
        <LinkedIn alt="My LinkedIn" />
      </ConsolidatedLink>
    </div>
  );
}
