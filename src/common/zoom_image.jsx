import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import mediumZoom from "medium-zoom";
import { Box, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { BrokenImage } from "@material-ui/icons";

const ZoomContext = React.createContext();

export function ZoomImageContainer({ children }) {
  const zoomParentRef = useRef(mediumZoom());

  return (
    <ZoomContext.Provider value={{ zoomParentRef }}>
      {children}
    </ZoomContext.Provider>
  );
}
ZoomImageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const useStyles = makeStyles((theme) => ({
  brokenImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.grey[100],
  },
}));

export default function ZoomImage({
  alt,
  containerClassName = "",
  imageClassName = "",
  src,
  zoomSrc,
  zoomStyles = {},
}) {
  const classes = useStyles();
  const { zoomParentRef } = useContext(ZoomContext);
  const zoomRef = useRef(zoomParentRef.current.clone(zoomStyles));

  const [imageStatus, setImageStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    if (!zoomSrc) {
      return;
    }
    setTimeout(() => {
      // preloads and avoids a twitch when the <img src> changes
      const preload = new Image();
      preload.src = zoomSrc;
    }, 0);
  }, [zoomSrc]);

  function attachZoom(image) {
    zoomRef.current.attach(image);
  }

  const imageStatusSuccess = imageStatus === STATUS.SUCCESS;

  const imageStyles = imageStatusSuccess
    ? {}
    : { width: 0, height: 0, display: "inline" };

  return (
    <div className={containerClassName}>
      <Fade in={imageStatusSuccess}>
        <img
          ref={attachZoom}
          style={imageStyles}
          className={imageClassName}
          src={src}
          data-zoom-src={zoomSrc}
          alt={alt}
          onLoad={() => {
            setImageStatus(STATUS.SUCCESS);
          }}
          onError={() => {
            setImageStatus(STATUS.ERROR);
          }}
        />
      </Fade>
      {imageStatus === STATUS.LOADING && (
        <Skeleton variant="rect" classes={{ root: imageClassName }} />
      )}
      {imageStatus === STATUS.ERROR && (
        <Box className={`${imageClassName} ${classes.brokenImage}`}>
          <BrokenImage fontSize="inherit" color="disabled" />
        </Box>
      )}
    </div>
  );
}

ZoomImage.propTypes = {
  alt: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  src: PropTypes.string.isRequired,
  zoomSrc: PropTypes.string,
  zoomStyles: PropTypes.object,
};
