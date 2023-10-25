import { TCalendarEvent } from "../types/CalendarEvent";

export const checkOverlaps = (events: TCalendarEvent[]) => {
  return events.map((eventA) => {
    for (let eventB of events) {
      if (
        eventA._id !== eventB._id &&
        eventA.start < eventB.start + eventB.duration &&
        eventA.start + eventA.duration > eventB.start
      ) {
        return { ...eventA, overlaps: true };
      }
    }
    return { ...eventA, overlaps: false };
  });
};
