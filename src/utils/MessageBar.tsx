import { Toaster, toast } from "react-hot-toast";

const MessageBar = () => (
  <Toaster
    position="top-left"
    toastOptions={{
      duration: 5000,
      style: {
        background: "#fff",
        color: "#333",
      },
      success: {
        iconTheme: {
          primary: "#4caf50",
          secondary: "#fff",
        },
      },
      error: {
        iconTheme: {
          primary: "#f44336",
          secondary: "#fff",
        },
      },
    }}
  />
);

export default MessageBar;

// successNotify and errorNotify
export const successNotify = (msg: string) => toast.success(msg);
export const errorNotify = (err: string) => toast.error(err);
