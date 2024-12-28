import React from "react";
import "./button.css";

const Button = (props) => {
  const colorClass = props.color === "primary" ? "btn-primary" : "btn-secondary";
  const sizeClass =
    props.size === "small"
      ? "btn-small"
      : props.size === "large"
      ? "btn-large"
      : "btn-regular";

  return (
    <button className={`button ${colorClass} ${sizeClass}`} onClick={props.onClick}>
      {props.icon && <span className="button-icon">{props.icon}</span>}
      {props.children}
    </button>
  );
};

export default Button;
