import React from "react";
import classes from "./CakeControls.module.css";
import CakeControl from "./CakeControl/CakeControl";
import Button from "../../UI/Button/Button";

const CONTROLS = [
  { label: "Red Velvet", type: "redVelvet" },
  { label: "Boston Cream", type: "bastonCream" },
  { label: "Mocha", type: "mocha" },
  { label: "Key Lime", type: "keyLime" },
  { label: "Checolate White", type: "checolateWhite" },
  { label: "Lemon Drop", type: "lemonDrop" },
];

export default ({
  canOrder,
  ingredients,
  addIngredient,
  removeIngredient,
  startOrder,
}) => {
  const controlsOutput = CONTROLS.map((control) => (
    <CakeControl
      key={control.type}
      control={control}
      addIngredient={addIngredient}
      removeIngredient={removeIngredient}
      disabled={ingredients[control.type] === 0}
    />
  ));

  return (
    <div className={classes.CakeControls}>
      {controlsOutput}
      <Button click={startOrder} enabled={canOrder}>
        Order
      </Button>
    </div>
  );
};
