import "./checkout.styles.scss";
import { DropDownContext } from "../../context/dropDown.context";
import { useContext } from "react";
import CheckoutItem from "../checkout-item/checkout-item.component";

export default function Checkout() {
  const { cartItems, totalCost } = useContext(DropDownContext);

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>

        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <span className="total">Total: ${totalCost}</span>
    </div>
  );
}
