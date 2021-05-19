const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION_MESSAGE":
      return action.data;

    case "DELETE_NOTIFICATION_MESSAGE":
      return "";

    default:
      return state;
  }
};

// export const setNotification = (notification) => ({
//   type: "SET_NOTIFICATION_MESSAGE",
//   data: notification,
// });

var timeout;

export const setNotification = (notification, sec) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION_MESSAGE",
      data: notification,
    });
    timeout = setTimeout(
      () =>
        dispatch({
          type: "SET_NOTIFICATION_MESSAGE",
          data: "",
        }),
      sec * 1000
    );
  };
};

export const unsetNotification = () => {
  return { type: "SET_NOTIFICATION_MESSAGE" };
};

export default notificationReducer;
