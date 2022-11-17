import { createContext, useReducer } from "react";

export const DropDownContext = createContext({
  currentDDClickedState: null,
  setCurrentDDClickedState: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalItems: 0,
});

// Find total quantity of items
const calculateTotalItems = (cartItems) => {
  return cartItems.reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);
};

const calculateTotalCost = (cartItems) => {
  return cartItems.reduce((prev, current) => {
    return prev + current.price * current.quantity;
  }, 0);
};

// Creates a new cart with given currentCart and an item to add
// to the cart. If the item exists in the cart already, increase
// the quantity of the item. Otherwise, only add the product to
// the cart.
const addToCart = (currentCart, cartItemToAdd) => {
  // returns a reference
  const itemExists = currentCart.find(
    (product) => cartItemToAdd.id === product.id
  );

  // IMPORTANT: We need to return a compleltely new cart, instead
  // of a modified version because react sees the difference in the
  // state variables based on the differences in the stored references
  let newCart = null;

  if (itemExists) {
    newCart = currentCart.map((item) =>
      cartItemToAdd.id === item.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    newCart = [...currentCart, { ...cartItemToAdd, quantity: 1 }];
  }

  return newCart;
};

const removeFromCart = (currentCart, cartItemToRemove) => {
  return currentCart
    .map((item) =>
      cartItemToRemove.id === item.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);
};

const clearFromCart = (currentCart, cartItemToClear) => {
  return currentCart.filter((item) => cartItemToClear.id !== item.id);
};

export const DROP_DOWN_ACTIONS = {
  TOGGLE_CART: "TOGGLE_CART",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const dropDownReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case DROP_DOWN_ACTIONS.SET_CART_ITEMS:
      const { totalItems, totalCost, cartItems } = payload;

      return {
        ...state,
        totalItems,
        totalCost,
        cartItems,
      };

    case DROP_DOWN_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        currentDDClickedState: payload,
      };

    default:
      throw new Error(`Unhandled type of ${type} is passed to the reducer`);
  }
};

const INITIAL_STATE = {
  currentDDClickedState: false,
  cartItems: [],
  totalItems: 0,
  totalCost: 0,
};

export const DropDownProvider = ({ children }) => {
  const [
    { currentDDClickedState, cartItems, totalItems, totalCost },
    dispatch,
  ] = useReducer(dropDownReducer, INITIAL_STATE);

  const changeItemsInCart = (product, changeCallBack) => {
    const newCart = changeCallBack(cartItems, product);

    const payload = {
      cartItems: newCart,
      totalItems: calculateTotalItems(newCart),
      totalCost: calculateTotalCost(newCart),
    };

    dispatch({
      payload: payload,
      type: DROP_DOWN_ACTIONS.SET_CART_ITEMS,
    });
  };

  const addItemToCart = (productToAdd) => {
    changeItemsInCart(productToAdd, addToCart);
  };

  const removeItemFromCart = (productToRemove) => {
    changeItemsInCart(productToRemove, removeFromCart);
  };

  const clearItemFromCart = (productToClear) => {
    changeItemsInCart(productToClear, clearFromCart);
  };

  const setCurrentDDClickedState = (isCartOpen) => {
    dispatch({ payload: isCartOpen, type: DROP_DOWN_ACTIONS.TOGGLE_CART });
  };

  const value = {
    currentDDClickedState,
    setCurrentDDClickedState,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    totalItems,
    totalCost,
  };

  return (
    <DropDownContext.Provider value={value}>
      {children}
    </DropDownContext.Provider>
  );
};
