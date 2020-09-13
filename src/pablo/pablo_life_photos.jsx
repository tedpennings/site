import React from "react";

import PabloImage from "./pablo_image";
import PabloContentRow from "./pablo_content_row";

import myFavPhoto from "./nicu-1.jpeg";
import pabloAndTed from "./pablo-ted.jpeg";
import fingersPhoto from "./nicu-fingers.jpeg";

export default function PabloLifePhotos() {
  return (
    <PabloContentRow>
      <PabloImage
        src={myFavPhoto}
        alt="My favorite photo of Pablo"
        orientation="landscape"
      />
      <PabloImage
        src={fingersPhoto}
        alt="Pablo holding my fingers"
        orientation="square"
      />
      <PabloImage
        src={pabloAndTed}
        alt="Me holding Pablo" // TODO this photo is broken (because portrait)
        orientation="portrait"
      />
    </PabloContentRow>
  );
}
