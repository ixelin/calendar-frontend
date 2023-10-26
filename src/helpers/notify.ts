import { toast } from "react-toastify";

export function notify(msg: string) {
  return toast(msg, { type: "error", pauseOnHover: false });
}
