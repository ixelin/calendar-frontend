import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteCalendarEvent,
  setCalendarEvent,
} from "../../features/Calendar/calendarSlice";
import "./SelectEvent.scss";
import { minutesToHHMM } from "../../helpers/minutesToHHMM";
import DeleteModal from "./DeleteModal";

const SelectEvent: React.FC = () => {
  type RouteParams = {
    id: string;
  };
  const [open, setOpen] = React.useState(false);

  const { id = 0 } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const { calendarEvent, calendar } = useAppSelector((state) => state.calendar);

  useEffect(() => {
    const selectedEvent = calendar.find((event) => event.id === +id);
    if (selectedEvent) {
      dispatch(setCalendarEvent(selectedEvent));
    }
  }, [id]);
  const navigate = useNavigate();
  const handleDelete = (decision: boolean) => {
    if (decision) {
      dispatch(deleteCalendarEvent(+id));
      navigate("/");
    }
  };
  return (
    <div className="event-wrapper">
      <h2>{calendarEvent?.title}</h2>
      <div>Start: {calendarEvent && minutesToHHMM(calendarEvent.start)}</div>
      <div>Duration: {calendarEvent?.duration} minutes</div>
      <div>User ID: {calendarEvent?.userId}</div>
      <div>Event ID: {calendarEvent?.id}</div>
      <h3 onClick={() => setOpen(true)}>Remove the event</h3>
      <DeleteModal open={open} setOpen={setOpen} onDelete={handleDelete} />
    </div>
  );
};

export default SelectEvent;
