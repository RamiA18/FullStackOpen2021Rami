const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION_MESSAGE":
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: "SET_NOTIFICATION_MESSAGE",
  data: notification,
});

export default notificationReducer;
