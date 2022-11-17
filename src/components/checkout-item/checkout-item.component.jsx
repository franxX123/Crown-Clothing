import { DropDownContext } from "../../context/dropDown.context";
import { useContext } from "react";
import "./checkout-item.styles.scss";

export default function CheckoutItem({ item }) {
  const { removeItemFromCart, addItemToCart, clearItemFromCart } =
    useContext(DropDownContext);
  const { name, price, quantity, imageUrl } = item;

  const addToCart = () => {
    addItemToCart(item);
  };

  const removeFromCart = () => {
    removeItemFromCart(item);
  };

  const clearItemFromCartHandler = () => {
    clearItemFromCart(item);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={removeFromCart} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={addToCart} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemFromCartHandler}>
        &#10005;
      </div>

      {/* 
      <h2>{name}</h2>
      <span>{price} x</span>

      <div>
        <span onClick={removeFromCart}>-</span>
        <span>{quantity}</span>
        <span onClick={addToCart}>+</span>
      </div>
      <span onClick={removeAllFromCart}>Remove</span> */}
    </div>
  );
}
