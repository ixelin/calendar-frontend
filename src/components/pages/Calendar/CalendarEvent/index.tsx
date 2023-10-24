import React from "react";
import cx from 'classnames';
import { TCalendarEvent } from "../../../../types/CalendarEvent";
import "./CalendarEvent.scss";
interface CalendarEventProps {
  event: TCalendarEvent;
};
const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const isShort = event.duration < 10;
  const gridStart = event.start + 1;
  const gridSpan = event.duration + 1;
  function minutesToHHMM(minutes : number) {
    if (isNaN(minutes) || minutes < 0) {
      return "Invalid input";
    }
  
    const adjustedMinutes = (minutes + 480) % 1440; // Adding 480 to handle the shift from 0 to 8:00
    const hours = Math.floor(adjustedMinutes / 60);
    const remainingMinutes = adjustedMinutes % 60;
  
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  
    return `${hoursStr}:${minutesStr}`;
  }
  return (
    <div className="event" style={{ gridRow: `${gridStart} / span ${gridSpan}` }}>
      {/* {isShort ? '' : event.title} */}
      {minutesToHHMM(event.start)} - {minutesToHHMM(event.start + event.duration)}
    </div>
  );
};



export default CalendarEvent;
