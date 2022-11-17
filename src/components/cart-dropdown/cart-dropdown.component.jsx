import { Button, BUTTON_TYPES } from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { DropDownContext } from "../../context/dropDown.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropDownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

export default function CartDropDown() {
  const { cartItems } = useContext(DropDownContext);

  const navigate = useNavigate();
  const navigateToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <DropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button
        buttonType={BUTTON_TYPES.base}
        onClick={navigateToCheckoutHandler}
      >
        CHECKOUT
      </Button>
    </DropDownContainer>
  );
}
