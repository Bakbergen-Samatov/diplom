import * as actions from "./actions";

const initialState = {
  ingredients: {
    avocadoMaki: 1,
    avocadoTunaRoll: 1,
    californiaMaki: 1,
    californiaTunaRoll: 1,
    ikuraMaki: 1,
    salmonMaki: 1,
  },
  price: 100,
};

const PRICES = {
    redVelvet: 6,
    BostonCream: 10,
    Mocha: 8,
    KeyLime: 11,
    ChecolateWhite: 15,
    LemonDrop: 12.,
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        price: state.price + PRICES[action.ingredient],
      };

    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        price: state.price - PRICES[action.ingredient],
      };

    default:
      return state;
  }
};
