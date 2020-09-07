import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import mediumZoom from "medium-zoom";
import { Fade } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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

export default function ZoomImage({
  alt,
  containerClassName = "",
  imageClassName = "",
  src,
  zoomStyles = {},
}) {
  const { zoomParentRef } = useContext(ZoomContext);
  const zoomRef = useRef(zoomParentRef.current.clone(zoomStyles));

  const [imageLoaded, setImageLoaded] = useState(false);

  function attachZoom(image) {
    zoomRef.current.attach(image);
  }

  const imageStyles = imageLoaded
    ? {}
    : { width: 0, height: 0, display: "inline" };

  return (
    <div className={containerClassName}>
      <Fade in={imageLoaded}>
        <img
          style={imageStyles}
          className={imageClassName}
          src={src}
          alt={alt}
          ref={attachZoom}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
      </Fade>
      {!imageLoaded && (
        <Skeleton variant="rect" classes={{ root: imageClassName }} />
      )}
    </div>
  );
}
ZoomImage.propTypes = {
  alt: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  src: PropTypes.string.isRequired,
  zoomStyles: PropTypes.object,
};
