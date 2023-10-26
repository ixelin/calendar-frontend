import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCalendarEvent } from "../../types/CalendarEvent";
import { API } from "../../enums/api";
import axiosRequest from "../../api/axios";
interface TInitialState {
  calendar: TCalendarEvent[];
  loading: boolean;
}
export const getCalendarEvents = createAsyncThunk("/events", async () => {
  const res = await axiosRequest.get(API.GET_EVENTS_LIST_FOR_USER);
  return res.data;
});

export const createCalendarEvent = createAsyncThunk(
  "/event",
  async (
    event: Omit<TCalendarEvent, "_id" | "userId">
  ): Promise<TCalendarEvent> => {
    const res = await axiosRequest.post(API.HANDLE_EVENT, event);
    return res.data;
  }
);
export const deleteCalendarEvent = createAsyncThunk(
  "/event-delete",
  async (eventId: string): Promise<TCalendarEvent> => {
    const res = await axiosRequest.delete(`${API.HANDLE_EVENT}${eventId}`);
    return res.data;
  }
);
export const getCalendarEvent = createAsyncThunk(
  "/get-event",
  async (eventId: string): Promise<TCalendarEvent> => {
    const res = await axiosRequest.get(`${API.HANDLE_EVENT}${eventId}`);
    return res.data;
  }
);
const initialState: TInitialState = {
  calendar: [],
  loading: false,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar: (state, action: PayloadAction<TCalendarEvent[]>) => {
      state.calendar = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCalendarEvents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCalendarEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.calendar = action.payload;
    });
    builder.addCase(getCalendarEvents.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createCalendarEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCalendarEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.calendar.push(action.payload);
    });
    builder.addCase(createCalendarEvent.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCalendarEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCalendarEvent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCalendarEvent.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
    });
  },
});

export const { setCalendar, setLoading } = calendarSlice.actions;
export default calendarSlice.reducer;
