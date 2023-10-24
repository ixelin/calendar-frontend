export type TCalendarEvent = {
  start: number;
  duration: number;
  title: string;
  userId: number;
  id: number;
  overlaps?:boolean
};
