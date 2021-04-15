import React from "react";

const Notification = ({ message, messageType, messageText }) => {
  if (message === "") {
    return null;
  }

  return (
    <div
      className={
        messageType === "rejected"
          ? "alert alert-danger"
          : "alert alert-success"
      }
    >
      {messageText}
    </div>
  );
};

export default Notification;
