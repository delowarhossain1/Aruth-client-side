import React from "react";
import CategoriesCart from "./CategoriesCart";
import { useQuery } from 'react-query';
import Loading from './../../../shared/Loading/Loading';

const Categories = () => {

  const {data:categories, isLoading} = useQuery(['category-list-display'], ()=>(
    fetch("http://localhost:5000/latest-category")
      .then((res) => res.json())
  ));

  if(isLoading){
    return <Loading />
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
    </section>
  );
};

export default Categories;
