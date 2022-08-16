import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProductCart from "../../../shared/Cart/ProductCart";
import Loading from "../../../shared/Loading/Loading";

const PopularProducts = () => {
  // popular product loaded by react query;
  const { data: products, loading } = useQuery("popularProducts", ()=>(
    fetch("http://localhost:5000/popular-products")
    .then(res => res.json())
  ));


  if(loading){
    return <Loading />
  }

  return (
    <section className="py-5">
      <h2 className="section-heading">Popular products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products?.map((product, index) => (
          <ProductCart key={Math.random() * index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
