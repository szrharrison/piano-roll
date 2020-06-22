import { createReducer } from "./reducerUtilities";
import { LOADING, PlayersLoadingEvent } from "../events/playersLoading";
import { FINISHED_LOADING, PlayersLoadedEvent } from "../events/playersLoaded";


const initialState = {
  buffers: [],
  loaded: []
};

export type ToneStore = {
  buffers: any[]
  loaded: any[]
}

const loading = (state: ToneStore, action: PlayersLoadingEvent): ToneStore => ({
  ...state,
  buffers: [
    ...state.buffers,
    action.loadingBuffer
  ]
});

const finishedLoading = (state: ToneStore, action: PlayersLoadedEvent): ToneStore => ({
  ...state,
  loaded: [
    ...state.loaded,
    action.loadedBuffer
  ]
});

type Events =
  | PlayersLoadingEvent
  | PlayersLoadedEvent;

const toneReducer = createReducer<ToneStore, Events>(initialState, {
  [LOADING]: loading,
  [FINISHED_LOADING]: finishedLoading
});

export default toneReducer;
