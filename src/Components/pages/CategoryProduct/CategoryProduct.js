import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading/Loading";
import ProductCart from "./../../shared/Cart/ProductCart";
import PageTitle from "../../shared/PageTitle/PageTitle";

const CategoryProduct = () => {
  const { id } = useParams();

  const { data: products, isLoading } = useQuery(["category-product"], () =>
    fetch(`https://afternoon-cove-39130.herokuapp.com/categories-product/${id}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-5">
      <PageTitle text={id ? id : 'Our products'} />

      <h2 className="mb-5 text-2xl text-primary">{id} <i class="fa-solid fa-chevron-right text-xl"></i></h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
