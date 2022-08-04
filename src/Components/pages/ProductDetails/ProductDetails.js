import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/product-details/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const {img, name, ratings, price, discount, size, availableQuantity, description, comments} = product;

  return (
    <section className="py-5 flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white w-full md:w-8/12 rounded p-2">
        <div>
          <img src={img} alt="product" />
        </div>
        <div>
            <h2>{name}</h2>
        </div>
      </div>

      <div className="w-full md:w-4/12"></div>
    </section>
  );
};

export default ProductDetails;
