import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Grow, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Pause, PlayArrow as Play } from "@material-ui/icons";
import WaveSurfer from "wavesurfer.js";

import pabloCrying from "./pablo_crying.m4a";

export default function CryingAudio() {
  const theme = useTheme();
  const audioRef = useRef();
  const wavesurferContainerRef = useRef();
  const wavesurferRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: wavesurferContainerRef.current,
      cursorColor: theme.palette.primary.main,
      progressColor: theme.palette.secondary.main,
      waveColor: theme.palette.text.secondary,
      cursorWidth: 2,
      barHeight: 5,
      barMinHeight: 2,
      backend: "MediaElement",
    });

    wavesurferRef.current.load(audioRef.current);

    // prettier-ignore
    const playingTrue = () => { setIsPlaying(true); };
    // prettier-ignore
    const playingFalse = () => { setIsPlaying(false); };

    wavesurferRef.current.on("play", playingTrue);
    wavesurferRef.current.on("pause", playingFalse);
    wavesurferRef.current.on("finish", playingFalse);

    wavesurferRef.current.on("waveform-ready", () => {
      setIsLoaded(true);
    });

    return function cleanup() {
      wavesurferRef.current.destroy();
    };
  }, [theme.palette]);

  const playActionText = isPlaying ? "Pause" : "Play";
  const playActionButtoon = isPlaying ? (
    <Pause fontSize="large" />
  ) : (
    <Play color="primary" fontSize="large" />
  );

  return (
    <Box
      width="100%"
      aria-label="Audio Player"
      role="region"
      aria-labelledby="cryCaption"
    >
      <audio ref={audioRef} id="crying" src={pabloCrying} preload="auto" />
      <Grow in={isLoaded} style={{ transformOrigin: "0 0 0" }}>
        <div ref={wavesurferContainerRef} />
      </Grow>
      <Box display="flex" alignItems="center" mt={1}>
        <IconButton
          disableRipple
          disableTouchRipple
          title={playActionText}
          aria-label={playActionText}
          aria-controls="crying"
          onClick={() => {
            wavesurferRef.current.playPause();
          }}
        >
          {playActionButtoon}
        </IconButton>
        <Box ml={1}>
          <Typography variant="caption" id="cryCaption">
            Pablo&apos;s cry after he was born, as his lungs were developing. We
            called it his goat noises 💖
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
