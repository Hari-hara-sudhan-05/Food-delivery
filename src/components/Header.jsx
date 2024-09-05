import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CardContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const modalContext = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  function handleShowCart() {
    modalContext.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button onClick={handleShowCart} className="text-button">
        Cart({totalCartItems})
      </button>
    </header>
  );
}
