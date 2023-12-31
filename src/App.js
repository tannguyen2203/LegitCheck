import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Footer } from "./components/Footer/footer";
import { CreateForm } from "./pages/shopadmin/createForm";
import { ProductDescription } from "./pages/shop/productDescription";
import { Login } from "./pages/login/login";
import { UpdateForm } from "./pages/shopadmin/updateForm";
import { Signup } from "./pages/login/singup";
import { Cart } from "./pages/cart/cart";
import { Scam } from "./pages/scam/scam";
import { ScamDescription } from "./pages/scam/scamDescription";
import { CreateScam } from "./pages/scam/createscam";
import { LoginShop } from "./pages/login/loginshop";
import { ShopCRUD } from "./pages/shop/shopcrud";
import { CheckOut } from "./pages/shop/checkout";
import { UserProvider } from "./pages/login/userContext";
import { ScamShop } from "./pages/scam/scamShop";
import { ShopItem } from "./pages/shop/shopItem";

function App() {
  useEffect(() => {
    document.title = "Legit Check";
  }, []);

  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/shopcrud/:shopId" element={<ShopCRUD />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/createProduct" element={<CreateForm />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginshop" element={<LoginShop />} />
            <Route path="/shopitem/:shopId" element={<ShopItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/scam" element={<Scam />} />
            <Route path="/scamshop/:shopId" element={<ScamShop />} />
            <Route path="/createscam" element={<CreateScam />} />
            <Route path="/scamdescription/:id" element={<ScamDescription />} />
            <Route path="/updateProduct/:id" element={<UpdateForm />} />
          </Routes>
        </UserProvider>
      </Router>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
