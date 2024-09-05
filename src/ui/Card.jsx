import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CardContext";

export default function Card({ listkey, reactImg, title, cost, description }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem({
      id: listkey,
      image: reactImg,
      name: title,
      price: cost,
      description: description,
    });
  }

  return (
    <li key={listkey} className="meal-item">
      <div>
        <img src={`http://localhost:3000/${reactImg}`} alt="" />
        <h3>{title}</h3>
        <p className="meal-item-price">{currencyFormatter.format(cost)}</p>
        <p className="meal-item-description">{description} </p>
        <button
          onClick={handleAddMealToCart}
          className="meal-item-actions button"
        >
          Add to Cart
        </button>
      </div>
    </li>
  );
}
