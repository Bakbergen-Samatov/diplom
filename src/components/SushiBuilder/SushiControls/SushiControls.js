import React from "react";
import classes from "./SushiControls.module.css";
import SushiControl from "./SushiControl/SushiControl";
import Button from "../../UI/Button/Button";

const CONTROLS = [
  { label: "Red Velvet", type: "avocadoMaki" },
  { label: "Boston Cream", type: "avocadoTunaRoll" },
  { label: "Mocha", type: "californiaMaki" },
  { label: "Key Lime", type: "californiaTunaRoll" },
  { label: "Checolate/White", type: "ikuraMaki" },
  { label: "Lemon Drop", type: "salmonMaki" },
];

export default ({
  canOrder,
  ingredients,
  addIngredient,
  removeIngredient,
  startOrder,
}) => {
  const controlsOutput = CONTROLS.map((control) => (
    <SushiControl
      key={control.type}
      control={control}
      addIngredient={addIngredient}
      removeIngredient={removeIngredient}
      disabled={ingredients[control.type] === 0}
    />
  ));

  return (
    <div className={classes.SushiControls}>
      {controlsOutput}
      <Button click={startOrder} enabled={canOrder}>
        Order
      </Button>
    </div>
  );
};
