export enum API {
  REGISTER = "http://192.168.1.111:3001/api/user/register",
  LOGIN = "http://192.168.1.111:3001/api/user/login",
  GET_USER_INFO = "http://192.168.1.111:3001/api/protected/user",
  GET_EVENTS_LIST_FOR_USER = "http://192.168.1.111:3001/api/protected/events/",
  HANDLE_EVENT = "http://192.168.1.111:3001/api/protected/event/",
  GET_EVENT_BY_ID = "http://192.168.1.111:3001/api/protected/event-by-id/",
}
