import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { deleteCalendarEvent, setLoading } from "../../../features/Calendar/calendarSlice";
import "./SelectEvent.scss";
import { minutesToHHMM } from "../../../helpers/minutesToHHMM";
import DeleteModal from "./DeleteModal";
import { TCalendarEvent } from "../../../types/CalendarEvent";
import axiosRequest from "../../../api/axios";
import { API } from "../../../enums/api";
import { notify } from "../../../helpers/notify";
const SelectEvent: React.FC = () => {
  type RouteParams = {
    id: string;
  };
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState<TCalendarEvent | null>(null);
const navigate = useNavigate()
  const { id = "0" } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const fetchEventById = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosRequest(`${API.GET_EVENT_BY_ID}${id}`);
      setEvent(res.data);
    } catch {
      navigate("/")
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchEventById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleDelete = async (decision: boolean) => {
    if (decision) {
      await dispatch(deleteCalendarEvent(id));
      navigate("/");
    }
  };
  return (
    <div className="event-wrapper">
          <h2>{event?.title}</h2>
          <div>Start: {event && minutesToHHMM(event.start)}</div>
          <div>Duration: {event?.duration} minutes</div>
          <div>User ID: {event?.userId}</div>
          <div>Event ID: {event?._id}</div>
          <h3 onClick={() => setOpen(true)}>Remove the event</h3>
          <DeleteModal open={open} setOpen={setOpen} onDelete={handleDelete} />
    </div>
  );
};

export default SelectEvent;
