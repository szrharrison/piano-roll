import React, { FunctionComponent, useCallback } from "react";
import classNames from "classnames";
import Track from "../models/track";
import Instrument from "../models/instrument";
import _ from "lodash";
import Player, { notePaths } from "../api/ToneKeyboardHandler";
import { bindActionCreators } from "redux";
import setTrack from "../actions/setTrack";
import playersLoading from "../events/playersLoading";
import playersLoaded from "../events/playersLoaded";
import { connect } from "react-redux";

const setLoadingNotes = (instrument, playersLoading, playersLoaded) => {
  const notes = _.keys(notePaths(instrument));
  notes.forEach(note => playersLoading(note));
  Player.setInstrument(instrument, playersLoaded);
};

export type Props = {
  track: Track,
  instrument: Instrument,
  active: boolean
} & ReturnType<typeof mapDispatchToProps>

const TrackItem: FunctionComponent<Props> = props => {
  const { track, instrument, active, setTrack, playersLoaded, playersLoading } = props;
  const instrumentNumber = ("000" + track.instrument).substr(-3);
  let handleClick = useCallback((e) => {
    setLoadingNotes(instrument.name, playersLoading, playersLoaded);
    setTrack(track.id);
  }, [track.id, instrument.name, playersLoaded, playersLoading, setTrack]);

  return <li onClick={handleClick}>
        <span
          className={classNames({ active })}
        >
          <img
            src={`https://raw.githubusercontent.com/andruo11/midi-pictures/master/${instrumentNumber}.jpg`}
            alt={instrument.name}
          />
          {track.name}
        </span>
  </li>;
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTrack,
  playersLoading,
  playersLoaded
}, dispatch);

export default connect(null, mapDispatchToProps)(TrackItem);
