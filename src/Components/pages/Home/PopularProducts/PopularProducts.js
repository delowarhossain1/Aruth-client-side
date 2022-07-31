import React, { useEffect, useState } from "react";
import ProductCart from "../../../shared/Cart/ProductCart";

const PopularProducts = () => {
  // I have to load data using react query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <section className="py-3">
      <h2 className="text-2xl uppercase mb-5">Popular products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {products?.map((product, index) => (
          <ProductCart key={Math.random() * index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
