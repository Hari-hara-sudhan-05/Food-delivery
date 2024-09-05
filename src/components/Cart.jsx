import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CardContext";
import CartItem from "../ui/CartItem";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
      open={userProgressCtx.progress === "cart"}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <button onClick={handleCloseCart} className="text-button">
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button onClick={handleGoToCheckout} className="button">
            Go to checkout
          </button>
        )}
      </p>
    </Modal>
  );
}
