export type PlayersLoadingEvent = {
  type: typeof LOADING,
  loadingBuffer: string
}

const playersLoading = (loadingBuffer: string): PlayersLoadingEvent => ({
  type: LOADING,
  loadingBuffer
});

export const LOADING = "tone.LOADING";

export default playersLoading;
