import React from "react";
import classes from "./Sushi.module.css";

export default ({ type }) => {
  const sushiClasses = [classes.Sushi, classes[type]];

  return <div className={sushiClasses.join(" ")}></div>;
};
