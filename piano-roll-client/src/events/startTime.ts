export type StartTimeEvent = { type: typeof START_TIME };

const startTime = (): StartTimeEvent => ({
  type: START_TIME
});

export const START_TIME = "time.START_TIME";

export default startTime;
