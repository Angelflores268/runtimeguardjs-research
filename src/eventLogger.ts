import type { ActionType } from "./policy";

export type MonitorEvent = {
  id: number;
  timestamp: string;
  action: ActionType;
  target: string;
  allowed: boolean;
  reason: string;
};

let events: MonitorEvent[] = [];
let nextId = 1;

type EventListener = (events: MonitorEvent[]) => void;

let listeners: EventListener[] = [];

export function recordEvent(
  event: Omit<MonitorEvent, "id" | "timestamp">
) {
  const newEvent: MonitorEvent = {
    ...event,
    id: nextId,
    timestamp: new Date().toLocaleTimeString(),
  };

  nextId += 1;

  events = [newEvent, ...events];

  for (const listener of listeners) {
    listener([...events]);
  }
}

export function getEvents(): MonitorEvent[] {
  return [...events];
}

export function subscribeToEvents(
  listener: EventListener
) {
  listeners.push(listener);

  listener([...events]);

  return () => {
    listeners = listeners.filter(
      (currentListener) => currentListener !== listener
    );
  };
}

export function clearEvents() {
  events = [];

  for (const listener of listeners) {
    listener([...events]);
  }
}
