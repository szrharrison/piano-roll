import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import "./App.css";
import fetchAllSongs from "./actions/fetchAllSongs";
import NoteSlot from "./components/NoteSlot";
import PianoKeysSidebar from "./components/PianoKeysSidebar";
import PlayHead from "./components/PlayHead";
import SongSelector from "./components/SongSelector";
import TimeBar from "./components/TimeBar";
import TracksHeader from "./components/TracksHeader";
import { sevenOctavePiano } from "./concerns/keyboard";

const notesPianoRoll = sevenOctavePiano.map((pianoKey, i) => {
  return <NoteSlot
    key={_.uniqueId("note_slot_")}
    pianoKey={pianoKey}
    dark={pianoKey.search("#") !== -1}
    pitch={108 - i}
  />;
});

const App = props => {
  useEffect(() => {
    props.fetchAllSongs();
  }, []);

  return <div className="App">
    <SongSelector/>
    <TracksHeader/>
    <div className="notes">
      <PianoKeysSidebar/>
      <div className="note-slots">
        <PlayHead/>
        {notesPianoRoll}
        <TimeBar/>
      </div>
    </div>
  </div>;
};

export default connect(null, { fetchAllSongs })(App);
