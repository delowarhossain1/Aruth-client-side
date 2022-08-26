import React, { useState } from "react";
import { useEffect } from "react";
import CategoriesCart from "./CategoriesCart";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latest-category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

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
