import React from "react";
import logo from "../../../assets/logo.svg";
import classes from "./Logo.module.css";

export default () => (
  <div className={classes.Logo}>
    <img src={logo} alt="CupCake Builder logo" />
    <span>CupCake Builder</span>
  </div>
);
