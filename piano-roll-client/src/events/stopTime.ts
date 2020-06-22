export type StopTimeEvent = { type: typeof STOP_TIME };

const stopTime = (): StopTimeEvent => ({
  type: STOP_TIME
});

export const STOP_TIME = "time.STOP_TIME";

export default stopTime;
