import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CardContext";
import { currencyFormatter } from "../util/formatting";
import Input from "../ui/Input";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest,clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const totalCartAmount = cartCtx.items.reduce(
    (totalAmount, item) => totalAmount + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <button onClick={handleClose} type="button" className="text-button">
        Close
      </button>
      <button className="button">Submit Order</button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Sucess!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <button onClick={handleFinish} className="button">
            Okay
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalCartAmount)}</p>
        <Input label={"Full Name"} type="text" id="name" />
        <Input label={"E-mail Address"} type="email" id="email" />
        <Input label={"Street"} type="text" id={"street"} />
        <div className="control-row">
          <Input label={"Postal Code"} type="text" id="postal-code" />
          <Input label={"City"} type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
