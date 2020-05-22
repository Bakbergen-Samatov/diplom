import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CakeKit from "../../components/CakeBuilder/CakeKit/CakeKit";
import classes from "./CakeBuilder.module.css";
import CakeControls from "../../components/CakeBuilder/CakeControls/CakeControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/CakeBuilder/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useSelector } from "react-redux";


export default withErrorHandler(() => {
  const { ingredients, price } = useSelector((state) => state);
  const [canOrder, setCanOrder] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const history = useHistory();

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
    const queryParams = Object.keys(ingredients).map(
      (ingredient) =>
        encodeURIComponent(ingredient) +
        "=" +
        encodeURIComponent(ingredients[ingredient])
    );
    queryParams.push("price=" + encodeURIComponent(price.toFixed(2)));

    history.push({
      pathname: "/checkout",
      search: queryParams.join("&"),
    });
  }

  function addIngredient(type) {
    const newIngredients = { ...ingredients };
    newIngredients[type]++;
    //setIngredients(newIngredients);
    checkCanOrder(newIngredients);

    //const newPrice = price + PRICES[type];
    //setPrice(newPrice);
  }

  function removeIngredient(type) {
    if (ingredients[type] >= 1) {
      const newIngredients = { ...ingredients };
      newIngredients[type]--;
      //setIngredients(newIngredients);
      checkCanOrder(newIngredients);

      //const newPrice = price - PRICES[type];
      //setPrice(newPrice);
    }
  }

  /*
  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then((response) => setIngredients(response.data))
      .catch((error) => {});
  }, []);
  */

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
  if (isOrdering) {
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
    <div className={classes.SushiBuilder}>
      <h1>CakeBuilder </h1>
      {output}
      <Modal show={isOrdering} hideCallback={cancelOrder}>
        {orderSummary}
      </Modal>
    </div>
  );
}, axios);
