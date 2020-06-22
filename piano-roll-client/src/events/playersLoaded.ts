export type PlayersLoadedEvent = {
  type: typeof FINISHED_LOADING,
  loadedBuffer: string
}

const playersLoaded = (loadedBuffer: string): PlayersLoadedEvent => ({
  type: FINISHED_LOADING,
  loadedBuffer
});

export const FINISHED_LOADING = "tone.FINISHED_LOADING";

export default playersLoaded;
