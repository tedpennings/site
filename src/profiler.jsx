/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useRaf } from "react-use";
import { IconButton, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/styles";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

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
  stacksContainer: { margin: theme.spacing(2, 0) },
  frame: {
    display: "grid",
    gridTemplateColumns: "32px 138px 200px 1fr",
    lineHeight: "30px",
    "& span": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
}));

export default function Profiler() {
  const classes = useStyles();
  const profileStatus = useProfileStatus();

  const profile = window.loadingProfile;
  const parentStacks = useMemo(() => findParentStacks(profile), [profile]);

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
        <ProfileContext.Provider value={{ profile, parentStacks }}>
          <VanityRow classes={classes} />
          <Samples classes={classes} />
          {/* <Stacks classes={classes} /> */}
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
  const { profile, parentStacks } = useProfile();
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
        value={parentStacks.length}
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
  const { profile } = useProfile();
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
      {samplesWithFrames.map(({ stackId, duration }, idx) => {
        const { frameId } = profile.stacks[stackId];
        return (
          <Frame
            key={idx}
            duration={duration}
            classes={classes}
            frameId={frameId}
          />
        );
      })}
    </div>
  );
}

function Stacks({ classes }) {
  const { parentStacks } = useProfile();
  return (
    <div className={classes.stacksContainer}>
      <Typography variant="h5">Stacks</Typography>
      {parentStacks.map(([idx, { frameId }]) => {
        return <Frame key={idx} classes={classes} frameId={frameId} />;
      })}
    </div>
  );
}

function Frame({ classes, duration, frameId, depth = 0, ancestorIds = [] }) {
  const theme = useTheme();
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(depth <= 10);

  const { name, line, column, resourceId } = profile.frames[frameId];

  const children = useMemo(
    // TODO this seems wrong
    () => profile.stacks.filter((f) => f.parentId === frameId),
    [frameId, profile]
  );

  const Icon = isOpen ? DownIcon : RightIcon;

  const durationCopy = duration ? `(${duration.toFixed(1)}ms)` : false;

  return (
    <>
      <div
        className={classes.frame}
        style={{
          margin: theme.spacing(depth === 0 ? 3 : 0, 0, 0, depth),
        }}
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
        <span>
          Frame {frameId} {durationCopy}
        </span>
        <span>{name || "<root>"}</span>{" "}
        <span>
          ({profile.resources[resourceId]}: {line}:{column})
        </span>
      </div>
      {isOpen &&
        children.map(
          (c) =>
            !ancestorIds.includes(c.frameId) && (
              <Frame
                key={c.frameId}
                classes={classes}
                frameId={c.frameId}
                depth={depth + 1}
                ancestorIds={ancestorIds.concat(c.frameId)}
              />
            )
        )}
    </>
  );
}

function findParentStacks(profile) {
  const parents = [];
  (profile?.stack ?? []).forEach((stack, idx) => {
    if (typeof stack.stackId === "number") {
      parents.push([idx, stack]);
    }
  });
  return parents;
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
