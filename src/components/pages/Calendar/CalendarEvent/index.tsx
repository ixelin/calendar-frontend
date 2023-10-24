import React from "react";
import { TCalendarEvent } from "../../../types/CalendarEvent";
import "./CalendarEvent.scss";
import { minutesToHHMM } from "../../../helpers/minutesToHHMM";
import { useNavigate } from "react-router";
interface CalendarEventProps {
  event: TCalendarEvent;
};
const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const isShort = event.duration < 10;
  const gridStart = event.start + 1;
  const gridSpan = event.duration + 1;
  const navigate = useNavigate()
  function handleClick() {
    navigate(`/${event.id}`)
  }
  return (
    <div onClick = {handleClick} className="event" style={{ gridRow: `${gridStart} / span ${gridSpan}`}}>
      {isShort ? '' : event.title}
      {/* {minutesToHHMM(event.start)} - {minutesToHHMM(event.start + event.duration)} */}
    </div>
  );
};



export default CalendarEvent;
