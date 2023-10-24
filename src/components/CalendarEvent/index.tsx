import React from "react";
import { TCalendarEvent } from "../../types/CalendarEvent";
import "./CalendarEvent.scss";
interface CalendarEventProps {
  event: TCalendarEvent;
};
const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const isShort = event.duration < 10;
  const gridStart = event.start + 1;  // +1 because grid-row starts at 1
  const gridSpan = event.duration;

  return (
    <div className="event" style={{ gridRow: `${gridStart} / span ${gridSpan}` }}>
      {isShort ? '' : event.title}
    </div>
  );
};



export default CalendarEvent;
