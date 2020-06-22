import { combineReducers, Reducer } from "redux";
import time, { TimeStore } from "./timeReducer";
import music, { MusicStore } from "./musicReducer";

export type ReduxStore = {
  time: TimeStore
  music: MusicStore
}
const rootReducer: Reducer<ReduxStore> = combineReducers({
  time,
  music
});

export default rootReducer;
