import React from "react";
import { Product } from "../shop/product";

function ShopListing() {
  const [productData, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://localhost:7010/api/Product/GetAllProduct")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>LegitCheck Shop</h1>
      </div>
      <div className="products">
        {productData.map((product) => (
          <div key={product.id}>
            <Product data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopListing;
