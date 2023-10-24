import React, { useEffect, useState } from "react";
import "./Calendar.scss";
import CalendarEvent from "../CalendarEvent";
import { TCalendarEvent } from "../../types/CalendarEvent";
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
const events: TCalendarEvent[] = [
  { start: 0, duration: 15, title: "Exercise" },
  { start: 25, duration: 30, title: "Travel to work" },
  { start: 30, duration: 30, title: "Plan day" },
  { start: 60, duration: 15, title: "Review yesterday's commits" },
  { start: 100, duration: 15, title: "Code review" },
  { start: 180, duration: 90, title: "Have lunch with John" },
  { start: 360, duration: 30, title: "Skype call" },
  { start: 370, duration: 45, title: "Follow up with designer" },
  { start: 405, duration: 30, title: "Push up branch" },
];

// vyvesti otsyda
function calculateOverlaps(events: TCalendarEvent[]) {
  const overlaps: TCalendarEvent[] = [];
  for (let i = 0; i < events.length; i++) {
    let overlapCount = 0;

    for (let j = 0; j < events.length; j++) {
      if (i === j) continue;

      if (
        (events[i].start >= events[j].start && events[i].start <= events[j].start + events[j].duration) ||
        (events[j].start >= events[i].start && events[j].start <= events[i].start + events[i].duration)
      ) {
        overlapCount++;
      }
    }

    overlaps.push({ ...events[i], overlap: !!overlapCount });
  }

  return overlaps;
}


const Calendar = () => {

 
  const [eventsList, setEventsList] = useState<TCalendarEvent[]>([]);

  useEffect(() => {
    const arr = calculateOverlaps(events);
    setEventsList(arr);
  }, []);

  
  return (
    <div className="calendar">
      <div className="time-slots">
        {timeLabels.map((time, idx) => (
          <span key={time} className={`time-slot ${idx % 2 === 1 ? "half-hour" : ""}`}>
            {time}
          </span>
        ))}
      </div>

      <div className="events">
        {eventsList.map((event, index) => (
          <CalendarEvent event={event} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
