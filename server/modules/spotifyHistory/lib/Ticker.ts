import { EventEmitter } from 'events';

import wait from '../../../utils/wait';

class Ticker extends EventEmitter {
  private tickHandle?: NodeJS.Timeout;
  private isTicking = false;
  /** How often in milliseconds to trigger the tick event */
  tickPeriod: number;
  /** How much in milliseconds to wait after calling `.start()` before the ticker starts. */
  tickOffset: number;
  /** Name of the event emitted on tick */
  tickEvent: string;

  constructor(
    options: {
      tickEvent?: string;
      tickPeriod?: number;
      tickOffset?: number;
    } = {}
  ) {
    super();
    const { tickEvent = 'tick', tickPeriod = 1000, tickOffset = 0 } = options;

    this.tickPeriod = tickPeriod;
    this.tickOffset = tickOffset;
    this.tickEvent = tickEvent;
  }

  start(): void {
    if (this.isTicking) return;
    this.doStart();
  }

  private async doStart(): Promise<void> {
    await wait(this.tickOffset);
    const doEmit = () => this?.emit(this.tickEvent || 'tick');
    this.tickHandle = setInterval(doEmit, this.tickPeriod || 1000);
    this.isTicking = true;
    doEmit();
  }

  stop(): void {
    if (!this.isTicking || !this.tickHandle) return;
    clearInterval(this.tickHandle);
    this.isTicking = false;
    this.removeAllListeners();
  }
}

export default Ticker;
