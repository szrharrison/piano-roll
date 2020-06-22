import trackSet from "../events/trackSet";

const setTrack = (trackId: number) => {
  return (dispatch, getState) => {
    const state = getState();
    const track = state.music.tracks.byId[trackId];
    dispatch(trackSet(trackId, track));
  };
};

export default setTrack;
