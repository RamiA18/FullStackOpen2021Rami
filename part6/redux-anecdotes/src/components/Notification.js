import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = ({ notification }) => {
  if (notification) {
    return <div className="alert alert-success">{notification}</div>;
  } else return null;
};

const mapStateToProps = (state) => ({ notification: state.notification });

const notificationConnected = connect(mapStateToProps)(Notification);

export default notificationConnected;
