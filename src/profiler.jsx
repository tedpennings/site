import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useRaf } from "react-use";
import { IconButton, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";
import RemoveIcon from "@material-ui/icons/Remove";

const PROFILE_STATUS = {
  NOT_READY: "not_ready",
  READY: "ready",
  TIMEOUT: "timeout",
};

const ProfileContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 100%",
    justifyContent: "center",
  },
  progress: {
    marginBottom: theme.spacing(2),
  },
  vanitySquareRow: {
    display: "flex",
    margin: theme.spacing(2, 0, 4, 0),
  },
  vanitySquare: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(20),
    padding: theme.spacing(0, 3),
    border: `1px solid ${theme.palette.grey[500]}`,
    marginRight: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  frame: {
    display: "grid",
    gridTemplateColumns: "32px 80px 200px 1fr",
    lineHeight: "30px",
    "& span": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
}));

export default function Profiler() {
  // const theme = useTheme();
  // console.log(theme);
  const classes = useStyles();
  const profileStatus = useProfileStatus();

  const profile = window.loadingProfile;

  if (
    !("Profiler" in window) ||
    !window.loadingProfileStart ||
    profileStatus === PROFILE_STATUS.TIMEOUT
  ) {
    return <Typography variant="h2">Profiling not supported</Typography>;
  }

  return (
    <div className={classes.container}>
      <Typography variant="h2">Profiler Example</Typography>

      {profileStatus === PROFILE_STATUS.NOT_READY || !profile ? (
        <Loading classes={classes} />
      ) : (
        <ProfileContext.Provider value={profile}>
          <VanityRow classes={classes} />
          <Stacks classes={classes} />
          <Samples classes={classes} />
        </ProfileContext.Provider>
      )}
    </div>
  );
}

function Loading({ classes }) {
  useRaf(5000); // animate!

  const currentProgressValue = Math.min(
    100,
    (100 * (window.performance.now() - window.loadingProfileStart)) /
      (window.loadingProfileEnd - window.loadingProfileStart)
  );

  return (
    <div className={classes.progressContainer}>
      <LinearProgress
        className={classes.progress}
        variant="determinate"
        value={currentProgressValue}
      />
      <Typography variant="subtitle1" align="center">
        Profiling page load...
      </Typography>
    </div>
  );
}
Loading.propTypes = {
  classes: PropTypes.object,
};

function VanityRow({ classes }) {
  const profile = useProfile();
  const parentFrames = useMemo(() => findParentFrames(profile), [profile]);
  return (
    <div className={classes.vanitySquareRow}>
      <VanitySquare
        heading="Samples"
        value={profile.samples.length}
        classes={classes}
      />
      <VanitySquare
        heading="Stacks"
        value={profile.stacks.length}
        classes={classes}
      />
      <VanitySquare
        heading="Parent Frames"
        value={parentFrames.length}
        classes={classes}
      />
      <VanitySquare
        heading="Frames"
        value={profile.frames.length}
        classes={classes}
      />
      <VanitySquare
        heading="Duration"
        value={
          Math.round(
            profile.samples[profile.samples.length - 1].timestamp -
              profile.samples[0].timestamp
          ) + "ms"
        }
        classes={classes}
      />
    </div>
  );
}

function VanitySquare({ heading, value, classes }) {
  return (
    <div className={classes.vanitySquare}>
      <Typography variant="subtitle1">{heading}</Typography>
      <Typography variant="subtitle2">{value}</Typography>
    </div>
  );
}

function Samples({ classes }) {
  const profile = useProfile();
  const samplesWithFrames = useMemo(() => {
    let swf = [];
    profile.samples.forEach((s, idx) => {
      if (typeof s.stackId === "number") {
        const nextSampleTimestamp = profile.samples[idx + 1]
          ? profile.samples[idx + 1].timestamp
          : null;
        swf.push({ ...s, duration: nextSampleTimestamp - s.timestamp });
      }
    });
    return swf;
  }, [profile]);
  return (
    <div className={classes.stacksContainer}>
      <Typography variant="h5">Samples</Typography>
      {samplesWithFrames.map(({ stackId }, idx) => {
        const { frameId, parentId } = profile.stacks[stackId];
        return <Frame key={idx} classes={classes} frameId={frameId} />;
      })}
    </div>
  );
}

function Stacks({ classes }) {
  const profile = useProfile();
  const parentFrames = useMemo(() => findParentFrames(profile), [profile]);
  return (
    <div className={classes.stacksContainer}>
      <Typography variant="h5">Stacks</Typography>
      {parentFrames.map(({ frameId }, idx) => {
        return <Frame key={idx} classes={classes} frameId={frameId} />;
      })}
    </div>
  );
}

function Frame({ classes, frameId, indent = 0 }) {
  const theme = useTheme();
  const profile = useProfile();
  const [isOpen, setIsOpen] = useState(indent < 4);

  const { name, line, column, resourceId } = profile.frames[frameId];

  const children = useMemo(
    () => profile.stacks.filter((f) => f.parentId === frameId),
    [frameId, profile]
  );
  const Icon = isOpen ? DownIcon : RightIcon;

  return (
    <>
      <div
        className={classes.frame}
        style={{ marginLeft: theme.spacing(indent / 2) }}
      >
        {children.length ? (
          <IconButton
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            size="small"
          >
            <Icon />
          </IconButton>
        ) : (
          <span />
        )}
        <span>Frame {frameId}</span>
        <span>{name || "<root>"}</span>{" "}
        <span>
          ({profile.resources[resourceId]}: {line}:{column})
        </span>
      </div>
      {isOpen &&
        indent < 10 && // TODO cycle detection
        children.map((c) => (
          <Frame
            key={c.frameId}
            classes={classes}
            frameId={c.frameId}
            indent={indent + 1}
          />
        ))}
    </>
  );
}

function findParentFrames(profile) {
  return profile.stacks.filter((stack) => typeof stack.parentId !== "number");
}

function useProfile() {
  return useContext(ProfileContext);
}

function useProfileStatus() {
  const [profileStatus, setProfileStatus] = useState(PROFILE_STATUS.NOT_READY);

  useEffect(() => {
    let loops = 0;
    const ivl = setInterval(() => {
      if (window.loadingProfile) {
        setProfileStatus(PROFILE_STATUS.READY);
        clearInterval(ivl);
      } else if (loops > 100) {
        setProfileStatus(PROFILE_STATUS.TIMEOUT);
        clearInterval(ivl);
      }
    }, 50);
    return () => {
      clearInterval(ivl);
    };
  }, []);
  return profileStatus;
}
