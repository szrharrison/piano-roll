import React, { FunctionComponent, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import passTime from "../events/passTime";
import PauseOutlineCircle from "../icons/pause-outline-circle.svg.js";
import Player from "../api/ToneKeyboardHandler";
import PlayOutlineCircle from "../icons/play-outline-circle.svg.js";
import startTime from "../events/startTime";
import StopOutlineCircle from "../icons/stop-outline-circle.svg.js";
import stopTime from "../events/stopTime";
import TimerClock from "./TimerClock";
import { ReduxStore } from "../reducers";
import { togglePause } from "../events/toggleBoolean";

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const TimeBar: FunctionComponent<Props> = (props) => {
  const { stopped, paused, duration, startTime, stopTime, togglePause, passTime } = props;
  useEffect(() => {
    Player.setTimer(passTime);
  }, []);

  const handlePressPlay = useCallback(() => {
    if (stopped) {
      startTime();
      Player.play();
    } else {
      if (paused) {
        togglePause();
        Player.play();
      } else {
        Player.pause();
        togglePause();
      }
    }
  }, [stopped, paused, startTime, togglePause]);

  const handlePressStop = useCallback(() => {
    Player.stop();
    stopTime();
  }, [stopTime]);

  let style, dividers;
  if (duration) {
    style = {
      width: duration * 200
    };
    dividers = _.times(Math.floor(duration), () => (
      <div
        key={_.uniqueId("divider_")}
        className="second"
      >
      </div>
    ));
  }
  return (
    <div id="time-bar" style={style}>
      <TimerClock/>
      <button
        onClick={handlePressPlay}
      >
        {paused ?
          <PlayOutlineCircle/>
          : <PauseOutlineCircle/>
        }
      </button>
      <button
        onClick={handlePressStop}
      >
        <StopOutlineCircle/>
      </button>
      {dividers}
    </div>
  );
};

const mapStateToProps = (state: ReduxStore) => ({
  duration: state.music.song.duration,
  paused: state.time.paused,
  playing: state.time.playing,
  stopped: !state.time.playing
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    passTime,
    togglePause,
    startTime,
    stopTime
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);
