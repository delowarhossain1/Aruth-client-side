import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading/Loading";
import ProductCart from "./../../shared/Cart/ProductCart";

const CategoryProduct = () => {
  const { id } = useParams();

  const { data: products, isLoading } = useQuery(["category-product"], () =>
    fetch(`http://localhost:5000/categories-product/${id}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-5">
      <h2 className="mb-5 text-3xl">{id}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {products?.map((product) => (
          <ProductCart product={product} key={product?._id} />
        ))}
      </div>

      {products?.length === 0 && (
        <div className="my-24">
          <h4 className="text-lg text-center">No result found...</h4>
        </div>
      )}
    </section>
  );
};

export default CategoryProduct;
