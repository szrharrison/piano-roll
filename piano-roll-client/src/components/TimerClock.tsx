import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

export type Props = ReturnType<typeof mapStateToProps>

const TimerClock: FunctionComponent<Props> = props => <div className="time">
  {props.currentTime}
</div>;

const mapStateToProps = state => ({
  currentTime: state.time.currentTime
});

export default connect(mapStateToProps)(TimerClock);
