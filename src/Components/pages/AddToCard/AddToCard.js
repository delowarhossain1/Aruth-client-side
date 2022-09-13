import React from "react";
import { useState } from "react";
import AddToCardItem from "./AddToCardItem";
import { useEffect } from "react";
import useAddToCard from "./../../../hooks/useAddToCard";

const AddToCard = ({handleCheckoutInfo}) => {
  const { getItemsInLocalStorage } = useAddToCard();
  const [products, setProducts] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const data = getItemsInLocalStorage();
    setProducts(data);
  }, [isReload]);

  return (
    <section className="py-5">
      <h2 className="mb-4 text-xl text-gray-500">Your Selected Item(s) </h2>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
        <div className="p-3 rounded col-span-7">
          {products?.map((product) => (
            <AddToCardItem
              key={product?.productId}
              product={product}
              reloadFun={setIsReload}
              reloadValue = {isReload}
              handleCheckoutInfo={handleCheckoutInfo}
            />
          ))}
        </div>
      </div>

      {products?.length === 0 && (
        <div className="py-5 text-lg text-center text-gray-500">
          You have no selected items
        </div>
      )}
    </section>
  );
};

export default AddToCard;
