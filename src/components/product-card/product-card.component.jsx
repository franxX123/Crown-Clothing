import { Button, BUTTON_TYPES } from "../button/button.component";
import "./product-card.styles.scss";
import { DropDownContext } from "../../context/dropDown.context";
import { useContext } from "react";

export default function ProductCard({ product }) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(DropDownContext);

  const addToCartHandler = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt="some product" />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button buttonType={BUTTON_TYPES.inverted} onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </div>
  );
}
