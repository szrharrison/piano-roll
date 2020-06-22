import React, { FunctionComponent } from "react";
import _ from "lodash";

import Key from "./PianoKey";
import sevenOctavePiano from "../resources/sevenOctavePianoKeys.json";

export type Props = {}

const PianoKeysSidebar: FunctionComponent<Props> = props => {
  const pianoOctave = sevenOctavePiano.map((pianoKey, i) => (
    <Key
      key={_.uniqueId("key_")}
      name={pianoKey}
      white={pianoKey.search("#") === -1}
    />
  ));
  return (
    <div id="nav-piano">
      <ul>
        {pianoOctave}
      </ul>
    </div>
  );
};

export default React.memo(PianoKeysSidebar);
