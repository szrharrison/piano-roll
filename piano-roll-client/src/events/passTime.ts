export type PassTimeEvent = {
  type: typeof PASS_TIME,
  time: number
}

const passTime = (currentTime: number): PassTimeEvent => {
  return {
    type: PASS_TIME,
    time: currentTime
  };
};

export const PASS_TIME = "time.PASS_TIME";

export default passTime;
