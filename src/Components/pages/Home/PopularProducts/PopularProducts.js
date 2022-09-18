import React from "react";
import { useQuery } from "react-query";
import ProductCart from "../../../shared/Cart/ProductCart";
import Loading from "../../../shared/Loading/Loading";

const PopularProducts = () => {
  // popular product loaded by react query;
  const { data: products, isLoading } = useQuery("popularProducts", ()=>(
    fetch("https://afternoon-cove-39130.herokuapp.com/popular-products")
    .then(res => res.json())
  ));


  if(isLoading){
    return <Loading />
  }

  return (
    <section className="py-5">
      <h2 className="section-heading">Popular products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {products?.map((product) => (
          <ProductCart key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
