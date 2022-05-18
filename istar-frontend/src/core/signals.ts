export const enum Signal {
  AddTag = 'add-tag',
  Sync = 'sync',
}

interface SignalReceiver {
  (...args: any[]): Promise<any>;
}

class SignalDispatcher {
  private readonly handlers: {[index: string]: Array<SignalReceiver>};

  constructor() {
    this.handlers = {};
  }

  register(signal: string, handler: SignalReceiver) {
    if (!this.handlers[signal]) {
      this.handlers[signal] = [];
    }
    this.handlers[signal].push(handler);
  }

  send(signal: string, ...args: any[]) {
    const handlers = this.handlers[signal];
    if (handlers) {
      handlers.forEach((h) => {
        h(...args);
      });
    }
  }
}

export const signalDispatcher = new SignalDispatcher();
