export enum API {
  REGISTER = `http://localhost:3001/api/user/register`,
  LOGIN = `http://localhost:3001/api/user/login`,
  GET_USER_INFO = `http://localhost:3001/api/protected/user`,
  GET_EVENTS_LIST_FOR_USER = `http://localhost:3001/api/protected/events/`,
  HANDLE_EVENT = `http://localhost:3001/api/protected/event/`,
  GET_EVENT_BY_ID = `http://localhost:3001/api/protected/event-by-id/`,
  JSON = `http://localhost:3001/api/protected/json`,
}
