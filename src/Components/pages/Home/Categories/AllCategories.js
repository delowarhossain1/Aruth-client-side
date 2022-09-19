import React from "react";
import { useQuery } from "react-query";
import CategoriesCart from "./CategoriesCart";
import PageTitle from './../../../shared/PageTitle/PageTitle';
import Loading from "../../../shared/Loading/Loading";

const AllCategories = () => {

  const { data: categories, isLoading } = useQuery(["our-categories"], () =>
    fetch(`http://localhost:5000/categories`).then((res) => res.json())
  );

  if(isLoading){
    return <Loading />
  }

  return (
    <section className="py-5">
      <PageTitle text="Our categories" />

      <h2 className="text-2xl text-gray-500">Our categories <i className="fa-solid fa-chevron-right text-xl"></i></h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5 mt-6">
        {categories?.map((category) => (
          <CategoriesCart key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default AllCategories;
