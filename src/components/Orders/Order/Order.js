import React from "react";
import classes from "./Order.module.css";

const CONTROLS = [
    { label: "Red Velvet", type: "redVelvet" },
    { label: "Boston Cream", type: "bastonCream" },
    { label: "Mocha", type: "mocha" },
    { label: "Key Lime", type: "keyLime" },
    { label: "Checolate White", type: "checolateWhite" },
    { label: "Lemon Drop", type: "lemonDrop" },
  ];

export default ({ price, ingredients, details }) => {
  const ingredientsOutput = Object.keys(ingredients).map((key) => (
    <span key={key} className={classes.ingredient}>
      {CONTROLS[key]} ({ingredients[key]})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <div className={classes.details}>
        {details.name}, {details.phone}, {details.address}
      </div>
      <div className={classes.price}>{price} som</div>
      <div className={classes.ingredients}>{ingredientsOutput}</div>
    </div>
  );
};
