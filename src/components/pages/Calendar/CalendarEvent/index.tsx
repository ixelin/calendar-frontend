import React from "react";
import { TCalendarEvent } from "../../../../types/CalendarEvent";
import "./CalendarEvent.scss";
import { minutesToHHMM } from "../../../../helpers/minutesToHHMM";
import { useNavigate } from "react-router";
interface CalendarEventProps {
  event: TCalendarEvent;
};
const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const isShort = event.duration < 10;
  const gridStart = event.start + 1;
  const gridSpan = event.duration;
  const navigate = useNavigate()
  function handleClick() {
    navigate(`/${event._id}`)
  }
  const gridColumnSpan = event.overlaps ? "span 1" : "span 2";
  return (
    <div onClick = {handleClick} className="event" id = {`${event.overlaps}`} style={{ gridRow: `${gridStart} / span ${gridSpan}`, gridColumn: gridColumnSpan}}>
      {isShort ? '' : event.title}
      {/* {minutesToHHMM(event.start)} - {minutesToHHMM(event.start + event.duration)} */}
    </div>
  );
};



export default CalendarEvent;
