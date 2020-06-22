import { createReducer } from "./reducerUtilities";
import { PASS_TIME, PassTimeEvent } from "../events/passTime";
import { START_TIME, StartTimeEvent } from "../events/startTime";
import { STOP_TIME, StopTimeEvent } from "../events/stopTime";
import { TOGGLE_BOOLEAN, ToggleBooleanEvent } from "../events/toggleBoolean";

export type TimeStore = {
  currentTime: number,
  playing: boolean,
  paused: boolean,
  stopped: boolean
}

const initialState: TimeStore = {
  currentTime: 0,
  playing: false,
  paused: true,
  stopped: true
};

const passTime = (state: TimeStore, action: PassTimeEvent): TimeStore => ({
  ...state,
  currentTime: action.time
});
const toggleBoolean = (state: TimeStore, action: ToggleBooleanEvent): TimeStore => ({
  ...state,
  [action.field]: !state[action.field]
});
const startTime = (state: TimeStore): TimeStore => ({
  ...state,
  playing: true,
  paused: false,
  stopped: false
});
const stopTime = (state: TimeStore): TimeStore => ({
  ...state,
  playing: false,
  paused: true,
  stopped: true,
  currentTime: 0
});

type Events =
  | PassTimeEvent
  | StartTimeEvent
  | StopTimeEvent
  | ToggleBooleanEvent

const timeReducer = createReducer<TimeStore, Events>(initialState, {
  [PASS_TIME]: passTime,
  [TOGGLE_BOOLEAN]: toggleBoolean,
  [START_TIME]: startTime,
  [STOP_TIME]: stopTime
});

export default timeReducer;
