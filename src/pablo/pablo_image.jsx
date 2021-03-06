import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ZoomableImage from "../common/zoom_image";

const IMAGE_ASPECT_RATIO = 3024 / 4032;

// In the standard image sizes, optimize for a consistent line height (40 units)
// For mobile devices screen sizes, size images to fill screen

const useStyles = makeStyles((theme) => ({
  imageCommon: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[4],
    // fontSize sets broken image icon size
    fontSize: theme.spacing(13),
  },
  portrait: {
    height: theme.spacing(40),
    width: theme.spacing(40 * IMAGE_ASPECT_RATIO),
    [`@media (max-width: 450px)`]: {
      height: "80vw",
      width: `calc(80vw * ${IMAGE_ASPECT_RATIO})`,
    },
  },
  landscape: {
    height: theme.spacing(40),
    width: theme.spacing(40 / IMAGE_ASPECT_RATIO),
    [`@media (max-width: 450px)`]: {
      height: `calc(80vw * ${IMAGE_ASPECT_RATIO})`,
      width: "80vw",
    },
  },
  square: {
    height: theme.spacing(40),
    width: theme.spacing(40),
    [`@media (max-width: 450px)`]: {
      height: "80vw",
      width: "80vw",
    },
  },
}));

export default function PabloImage({ src, orientation, alt }) {
  const classes = useStyles();
  const { imgSrc, zoomSrc } = useMemo(() => {
    let [standard, full] = Array.from(src.images)
      .sort((a, b) => a.width - b.width)
      .slice(-2);
    // there may only be one image in the srcset
    full = full || standard;
    return {
      imgSrc: standard.path,
      zoomSrc: full.path,
    };
  }, [src]);

  return (
    <Box className={classes.root}>
      <ZoomableImage
        key={src}
        imageClassName={`${classes.imageCommon} ${classes[orientation]}`}
        src={imgSrc}
        zoomSrc={zoomSrc}
        alt={alt}
      />
    </Box>
  );
}
PabloImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number,
        path: PropTypes.string,
        width: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
  orientation: PropTypes.oneOf(["portrait", "landscape", "square"]).isRequired,
};
