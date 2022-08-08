import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingsStar from "../../shared/Ratings/RatingsStar";

const ProductDetails = () => {
  const { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/product-details/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const {
    img,
    name,
    ratings,
    price,
    discount,
    size,
    availableQuantity,
    description,
    comments,
  } = product;
  console.log(description);
  const updateProductQuantity = (btn) => {
    console.log(btn);
    if (btn === "plus" && productQuantity < availableQuantity) {
      setProductQuantity(productQuantity + 1);
    } else if (btn === "minus") {
      if (productQuantity > 1) {
        setProductQuantity(productQuantity - 1);
      }
    }
  };

  return (
    <section>
      <div className="py-5 flex flex-col lg:flex-row">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white w-full md:w-8/12 rounded p-2">
          <div>
            <img src={img} alt="product" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <RatingsStar star={ratings} />
            <h2 className="my-3 text-5xl text-orange-500">${price}</h2>
            <h4 className="mt-2">Brand : No brand</h4>
            <h4 className="mt-2">Available : {availableQuantity} pice</h4>

            <div className="flex items-center mt-3">
              <span className="mr-3 font-semibold text-lg">Size</span>
              {size?.map((s, i) => (
                <span
                  key={i * Math.random()}
                  className=" w-8 border border-orange-500 rounded flex justify-center items-center cursor-pointer mr-3"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center">
              <span className="mr-5">Quantity </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateProductQuantity("minus")}
                  disabled={productQuantity === 1}
                >
                  <i class="fa-solid fa-minus text-xl cursor-pointer"></i>
                </button>
                <span className="text-xl bg-gray-100 p-2">
                  {productQuantity}
                </span>
                <button onClick={() => updateProductQuantity("plus")}>
                  <i class="fa-solid fa-plus text-xl cursor-pointer"></i>
                </button>
              </div>
            </div>

            <div className=" flex items-center space-x-5 mt-5">
              <button className="py-2 px-4 bg-blue-500 rounded text-white">
                <i class="fa-solid fa-cart-plus mr-2"></i>
                Add to Cart
              </button>
              <button className="py-2 px-4 bg-orange-500 rounded text-white">
                <i class="fa-solid fa-bag-shopping mr-2"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/12">dsfdsf</div>
      </div>

      <div className="bg-white p-3 text-lg lg:text-xl mb-2">
        <h2 className="text-2xl mb-2">{name}</h2>

        <ul className="text-sm font-semibold list-disc ml-5 mb-5">
          {description?.list?.map((l, i) => (
            <li key={i * Math.random()}> {l}</li>
          ))}
        </ul>

        <p className="text-sm">{description?.text}</p>
      </div>
    </section>
  );
};

export default ProductDetails;
