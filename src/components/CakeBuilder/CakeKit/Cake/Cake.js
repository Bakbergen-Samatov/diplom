import React from "react";
import classes from "./Cake.module.css";

export default ({ type }) => {
  const cakeClasses = [classes.Cake, classes[type]];

  return <div className={cakeClasses.join(" ")}></div>;
};
