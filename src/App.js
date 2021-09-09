import "./App.css";
import { commerce } from "./components/lib/Commerce";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Products, Navbar, Cart, Checkout } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    console.log(data);
  };

  const fetchCart = async () => {
    const res = await commerce.cart.retrieve();
    setCart(res);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const handleDeleteCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart && cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart && cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleDeleteCart={handleDeleteCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout cart = {cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
