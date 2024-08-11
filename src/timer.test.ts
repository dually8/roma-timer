import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BASE_TIMER, MAX_CYCLES, LONG_BREAK, SHORT_BREAK } from './constants.ts';

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should be done after the timer', () => {
    let isDone = false;
    setTimeout(() => {
      isDone = true;
    }, BASE_TIMER);
    vi.runAllTimers();
    expect(isDone).toBe(true);
  });

  it('should run 1 cycle', () => {
    // Setup cycle count
    let cycle = 4;
    // Setup a timeout for 25 minutes
    let isTaskTimerDone = false;
    setTimeout(() => {
      isTaskTimerDone = true;
    }, BASE_TIMER);
    // Run through it
    vi.runAllTimers();
    // Setup a timeout for 5 minutes
    let isBreakDone = false;
    setTimeout(() => {
      // Decrease the cycle count
      isBreakDone = true;
      cycle--;
    }, SHORT_BREAK);
    // Run through it
    vi.runAllTimers();
    // Expect two things:
    // 1) Cycle count is decreased by 1
    expect(cycle).toEqual(3);
    // 2) Both timeouts are done
    expect(isTaskTimerDone).toBe(true);
    expect(isBreakDone).toBe(true);
  });
  it('should run until long break', () => {
    // Setup cycle count
    let cycle = 1;
    while (cycle > 0) {
      // Setup a timeout for 25 minutes
      let isTaskTimerDone = false;
      setTimeout(() => {
        isTaskTimerDone = true;
      }, BASE_TIMER);
      // Run through it
      vi.runAllTimers();
      // Setup a timeout for 5 minutes
      let isBreakDone = false;
      setTimeout(() => {
        // Decrease the cycle count
        isBreakDone = true;
        cycle--;
      }, SHORT_BREAK);
      // Run through it
      vi.runAllTimers();
      // Expect two things:
      // 1) Cycle count is decreased by 1
      expect(cycle).toEqual(0);
      // 2) Both timeouts are done
      expect(isTaskTimerDone).toBe(true);
      expect(isBreakDone).toBe(true);
    }
    // Setup long break
    let isLongBreakDone = false;
    setTimeout(() => {
      isLongBreakDone = true;
      cycle = MAX_CYCLES;
    }, LONG_BREAK);
    vi.runAllTimers();
    expect(cycle).toEqual(MAX_CYCLES);
    expect(isLongBreakDone).toBe(true);
  });
});
