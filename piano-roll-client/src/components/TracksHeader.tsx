import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import { ReduxStore } from "../reducers";
import TrackItem from "./TrackItem";

export type Props = {} & ReturnType<typeof mapStateToProps>

const TracksHeader: FunctionComponent<Props> = props => {
  const tracks = props.tracks.allIds.map((trackId) => {
    const track = props.tracks.byId[trackId];
    return <TrackItem
      key={`${track.name}-${track.id}-${track.instrument}`}
      track={track}
      instrument={props.instrumentsById[track.instrument]}
      active={trackId === props.trackId}
    />;
  });

  return (
    <div className="tracks-header clearfix">
      <ul>
        {tracks}
      </ul>
    </div>
  );
};


const mapStateToProps = (state: ReduxStore) => ({
  tracks: state.music.tracks,
  trackId: state.music.tracks.id,
  instrumentsById: state.music.instrumentsById,
});

export default connect(mapStateToProps)(TracksHeader);
