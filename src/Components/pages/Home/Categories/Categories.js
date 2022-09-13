import React from "react";
import CategoriesCart from "./CategoriesCart";
import { useQuery } from "react-query";
import Loading from "./../../../shared/Loading/Loading";
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const { data: categories, isLoading } = useQuery(
    ["category-list-display"],
    () =>
      fetch("http://localhost:5000/latest-category").then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-5">
      <h2 className="section-heading">Categories</h2>

      <div className="flex align-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories?.map((category) => (
            <CategoriesCart key={category._id} category={category} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={()=> navigate('/categories')} className="text-xl text-blue-600 flex items-center border-b  hover:border-blue-600 hover:border-b border-transparent duration-100">
          <span>More</span> <i class="fa-solid fa-angles-right ml-1"></i>
        </button>
      </div>
    </section>
  );
};

export default Categories;
