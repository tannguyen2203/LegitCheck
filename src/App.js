import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Footer } from "./components/Footer/footer";
import { CreateForm } from "./pages/shopadmin/createForm";
import { ProductDescription } from "./pages/shop/productDescription";
import { Login } from "./pages/login/login";
function App() {
  useEffect(() => {
    document.title = "Legit Check";
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/createProduct" element={<CreateForm />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
