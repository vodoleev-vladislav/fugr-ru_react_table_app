import React from "react";
import { Alert } from "@material-ui/lab";
import "./Notification.css";

const Notification = ({ activeError, message }) => {
  if (!activeError) return null;
  return (
    <Alert className="notification" severity="error">
      {message}
    </Alert>
  );
};

export default Notification;
