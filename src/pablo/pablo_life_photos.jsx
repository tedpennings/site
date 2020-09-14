import React from "react";

import PabloImage from "./pablo_image";
import PabloContentRow from "./pablo_content_row";

import myFavPhoto from "./nicu-1.jpeg";
import fingersPhoto from "./nicu-fingers.jpeg";
import pabloAndTed from "./pablo-ted.jpeg";

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
        alt="Me holding Pablo"
        orientation="portrait"
      />
    </PabloContentRow>
  );
}
