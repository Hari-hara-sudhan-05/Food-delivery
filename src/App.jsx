import Header from "./components/Header";
import MealsData from "./components/MealsData";
import Cart from "./components/Cart";

import { CartContextProvider } from "./store/CardContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Checkout from "./components/Checkout";



function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
      <Header />
      <MealsData />
      <Cart/>
      <Checkout/>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
