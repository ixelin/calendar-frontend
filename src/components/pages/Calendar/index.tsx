import React, { useEffect, useMemo } from "react";
import "./Calendar.scss";
import CalendarEvent from "./CalendarEvent";
import { useAppSelector } from "../../app/hooks";
import { checkOverlaps } from "../../helpers/checkOverlaps";
const timeLabels = [
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
];
const Calendar = () => {
  const { calendar } = useAppSelector((state) => state.calendar);


  const list = useMemo(() => {
    return checkOverlaps(calendar);
  }, [calendar]);
  
  return (
    <div className="calendar">
      <div className="time-slots">
        {timeLabels.map((time, idx) => (
          <span
            key={time}
            className={`time-slot ${idx % 2 === 1 ? "half-hour" : ""}`}
          >
            {time}
          </span>
        ))}
      </div>

      <div className="events">
        {list.map((event, index) => (
          <CalendarEvent event={event} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
