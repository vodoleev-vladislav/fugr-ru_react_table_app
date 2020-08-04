import React from "react";
import { Alert } from "@material-ui/lab";

const Notification = ({ activeError, message }) => {
  if (!activeError) return null;
  return <Alert severity="error">{message}</Alert>;
};

export default Notification;
