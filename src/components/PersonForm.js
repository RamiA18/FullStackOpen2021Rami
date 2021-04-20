import React from "react";
import HeaderThree from "./HeaderThree";

const PersonForm = (props) => {
  return (
    <div>
      <HeaderThree text={props.title} />
      <form onSubmit={props.submitAction}>
        <div>
          name:{" "}
          <input value={props.nameValue} onChange={props.nameChangeHandling} />
        </div>
        <div>
          number:{" "}
          <input
            value={props.numberValue}
            onChange={props.numberChangeHandling}
          />
        </div>
        <div>
          <button className="btn btn-primary btn-small" type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
