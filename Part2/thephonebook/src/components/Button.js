import React from "react";

const Button = ({ onClickEvent, buttonText }) => {
  return (
    <button className="btn btn-warning btn-sm" onClick={onClickEvent}>
      {" "}
      {buttonText}{" "}
    </button>
  );
};

export default Button;
