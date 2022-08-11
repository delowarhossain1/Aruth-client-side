import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingsStar from "../../shared/Ratings/RatingsStar";
import CommentCart from "./CommentCart";

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

  const updateProductQuantity = (btn) => {
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
      <div className="py-5 flex flex-col lg:flex-row space-x-0 lg:space-x-5 space-y-5 lg:space-y-0">
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

              {/* Orders summery */}

        <div className="w-full md:w-4/12 p-3 bg-white shadow-md rounded">
          <h4 className="text-xl mb-3 text-center">Summery</h4>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <i class="fa-solid fa-truck text-gray-500"></i>
              <div className="flex flex-col ml-5">
                <span>Standard Delivery</span>
                <span className="text-sm text-gray-500">5 - 9 day(s)</span>
              </div>
            </div>

            <h4 className="text-lg text-orange-500">$12</h4>
          </div>

          <div className="flex items-center mb-4">
            <i class="fa-solid fa-money-bill-wave text-gray-500"></i>
            <div className="flex flex-col ml-5">
                <span>Cash on Delivery </span>
                <span className="text-sm text-gray-500">Available</span>
              </div>
          </div>

          <div className="flex items-center">
            <i class="fa-solid fa-shield text-gray-500"></i>
            <h2 className="ml-5">Warranty not available</h2>
          </div>
        </div>
      </div>

                {/* Product description & ratings */}
                
      <div className="bg-white p-3 mb-5">
        <h2 className="text-2xl mb-2">{name}</h2>

        <ul className="text-sm font-semibold list-disc ml-5 mb-5">
          {description?.list?.map((l, i) => (
            <li key={i * Math.random()}> {l}</li>
          ))}
        </ul>

        <p className="text-sm">{description?.text}</p>
      </div>

      <div className="p-3 bg-white">
        <h2 className="lg:text-xl">Ratings & Reviews of {name}</h2>

        <div className="mb-10">
          <h3 className="text-2xl lg:text-5xl text-orange-500 my-3">
            {ratings}
            <span className="text-xl text-gray-500">/5</span>
          </h3>

          <RatingsStar star={ratings} styles="text-xl lg:text-2xl" />

          <h4 className="text-sm text-gray-500">21 Ratings</h4>
        </div>

        <div>
          {comments?.map((comment) => (
            <CommentCart key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
