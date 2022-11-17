import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { DropDownContext } from "../../context/dropDown.context";

export default function CartIcon() {
  const { currentDDClickedState, setCurrentDDClickedState, totalItems } =
    useContext(DropDownContext);

  const toggle = () => {
    const newClickedState = !currentDDClickedState;
    setCurrentDDClickedState(newClickedState);
  };

  return (
    <div className="cart-icon-container" onClick={toggle}>
      <ShoppingCartIcon className="shopping-icon" />
      <span className="item-count">{totalItems}</span>
    </div>
  );
}
