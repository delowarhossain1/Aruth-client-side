import React from "react";
import { useQuery } from "react-query";
import CategoriesCart from "./CategoriesCart";

const AllCategories = () => {

  const { data: categories, isLoading } = useQuery(["our-categories"], () =>
    fetch(`http://localhost:5000/categories`).then((res) => res.json())
  );

  return (
    <section className="py-5">
      <h2 className="text-2xl text-gray-500">Our Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {categories?.map((category) => (
          <CategoriesCart key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default AllCategories;
