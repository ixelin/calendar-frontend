export type TCalendarEvent = {
  start: number;
  duration: number;
  title: string;
  userId: number;
  _id: string;
  overlaps?: boolean;
  __v?: number;
};
