import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCalendarEvent } from "../../types/CalendarEvent";

interface TInitialState {
  calendar: TCalendarEvent[];
}

const initialState: TInitialState = {
  calendar: [
    { start: 0, duration: 15, title: "Exercise", id: 1, userId: 1 },
    { start: 25, duration: 30, title: "Travel to work", id: 2, userId: 2 },
    { start: 30, duration: 30, title: "Plan day", id: 3, userId: 3 },
    {
      start: 60,
      duration: 15,
      title: "Review yesterday's commits",
      id: 4,
      userId: 4,
    },
    { start: 100, duration: 15, title: "Code review", id: 5, userId: 5 },
    {
      start: 180,
      duration: 90,
      title: "Have lunch with John",
      id: 6,
      userId: 6,
    },
    { start: 360, duration: 30, title: "Skype call", id: 7, userId: 7 },
    {
      start: 370,
      duration: 45,
      title: "Follow up with designer",
      id: 8,
      userId: 8,
    },
    { start: 405, duration: 30, title: "Push up branch", id: 9, userId: 9 },
  ],
};
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    createCalendarEvent: (state, action: PayloadAction<TCalendarEvent>) => {
      const largestId = state.calendar[state.calendar.length - 1].id;
      state.calendar.push({ ...action.payload, id: largestId + 1 });
    },
    deleteCalendarEvent: (state, action: PayloadAction<number>) => {
      state.calendar = state.calendar.filter(
        (calendar) => calendar.id !== action.payload
      );
    },
    setCalendar: (state, action: PayloadAction<TCalendarEvent[]>) => {
      state.calendar = action.payload;
    },
  },
});

export const { createCalendarEvent, deleteCalendarEvent, setCalendar } =
  calendarSlice.actions;

export default calendarSlice.reducer;
