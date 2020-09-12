import React from "react";

import PabloImage from "./pablo_image";
import PabloContentRow from "./pablo_content_row";

import ashesAltar from "./ashes-altar.jpeg";
import heartAshes from "./heart-ashes.jpeg";
import jenTedPeoonies from "./jen-ted-peonies.jpeg";

export default function PabloGriefPhotos() {
  return (
    <PabloContentRow>
      <PabloImage
        src={heartAshes}
        alt="Jen and Ted in a peony field"
        orientation="landscape"
      />
      <PabloImage
        src={ashesAltar}
        alt="Jen and Ted in a peony field"
        orientation="portrait"
      />
      <PabloImage
        src={jenTedPeoonies}
        alt="Jen and Ted in a peony field"
        orientation="landscape"
      />
    </PabloContentRow>
  );
}
