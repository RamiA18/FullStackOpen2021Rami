import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification) {
    return <div className="alert alert-success">{notification}</div>;
  } else return null;
};

export default Notification;
