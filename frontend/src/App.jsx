import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/collection" exact element={<Collection />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/contact" exact element={<Contact />} />
      <Route path="/product/:productId" exact element={<Product />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="place-order" exact element={<PlaceOrder />} />
      <Route path="orders" exact element={<Orders />} />
    </Routes>
  </Router>
);

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">{routes}</div>
  );
}

export default App;
