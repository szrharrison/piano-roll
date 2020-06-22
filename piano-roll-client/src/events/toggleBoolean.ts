export type ToggleBooleanEvent = {
  type: typeof TOGGLE_BOOLEAN,
  field: "paused" | "stopped" | "playing"
}

export const togglePause = (): ToggleBooleanEvent => {
  return {
    type: TOGGLE_BOOLEAN,
    field: "paused"
  };
};

export const TOGGLE_BOOLEAN = "time.TOGGLE_BOOLEAN";
