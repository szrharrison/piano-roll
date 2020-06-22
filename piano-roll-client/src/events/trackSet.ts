import Track from "../models/track";

export type SetTrackEvent = {
  type: typeof SET_TRACK,
  trackId: number,
  track: Track
}
const trackSet = (trackId, track): SetTrackEvent => ({
  type: SET_TRACK,
  trackId,
  track
});

export const SET_TRACK = "tracks.SET_TRACK";

export default trackSet;
