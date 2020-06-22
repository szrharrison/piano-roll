import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { ReduxStore } from "../reducers";

const PlayHead: FunctionComponent<ReturnType<typeof mapStateToProps>> = props => {
  const { currentTime } = props;
  return <div className="play-head" style={{ width: currentTime * 200 }}>{currentTime}</div>;
};

const mapStateToProps = (state: ReduxStore) => ({
  currentTime: state.time.currentTime
});

export default connect(mapStateToProps)(PlayHead);
