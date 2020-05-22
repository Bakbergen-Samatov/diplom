import React, { useState, useEffect } from "react";
import CakeKit from "../../components/CakeBuilder/CakeKit/CakeKit";
import classes from "./CakeBuilder.module.css";
import CakeControls from "../../components/CakeBuilder/CakeControls/CakeControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/CakeBuilder/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const PRICES = {
  redVelvet: 6,
  BostonCream: 10,
  Mocha: 8,
  KeyLime: 11,
  ChecolateWhite: 15,
  LemonDrop: 12.,
};

export default withErrorHandler(() => {
  const [ingredients, setIngredients] = useState(null);
  const [price, setPrice] = useState(100);
  const [canOrder, setCanOrder] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [loading, setLoading] = useState(false);

  function checkCanOrder(ingredients) {
    const total = Object.keys(ingredients).reduce((total, ingredient) => {
      return total + ingredients[ingredient];
    }, 0);
    setCanOrder(total > 0);
  }

  function startOrder() {
    setIsOrdering(true);
  }

  function cancelOrder() {
    setIsOrdering(false);
  }

  function finishOrder() {
    const order = {
      ingredients: ingredients,
      price: price,
      delivery: "Fast",
      customer: {
        name: "Bakyt",
        phone: "0700700700",
        address: {
          street: "123 Gebze",
          city: "Karakol",
        },
      },
    };

    setLoading(true);
    axios.post("/orders.json", order).then((response) => {
      setLoading(false);
      setIsOrdering(false);
    });
  }

  function addIngredient(type) {
    const newIngredients = { ...ingredients };
    newIngredients[type]++;
    setIngredients(newIngredients);
    checkCanOrder(newIngredients);

    const newPrice = price + PRICES[type];
    setPrice(newPrice);
  }

  function removeIngredient(type) {
    if (ingredients[type] >= 1) {
      const newIngredients = { ...ingredients };
      newIngredients[type]--;
      setIngredients(newIngredients);
      checkCanOrder(newIngredients);

      const newPrice = price - PRICES[type];
      setPrice(newPrice);
    }
  }

  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then((response) => setIngredients(response.data))
      .catch((error) => {});
  }, []);

  let output = <Spinner />;
  if (ingredients) {
    output = (
      <>
        <CakeKit price={price} ingredients={ingredients} />
        <CakeControls
          startOrder={startOrder}
          canOrder={canOrder}
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      </>
    );
  }

  let orderSummary = <Spinner />;
  if (isOrdering && !loading) {
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        finishOrder={finishOrder}
        cancelOrder={cancelOrder}
        price={price}
      />
    );
  }

  return (
    <div className={classes.CakeBuilder}>
      {output}
      <Modal show={isOrdering} hideCallback={cancelOrder}>
        {orderSummary}
      </Modal>
    </div>
  );
}, axios);
