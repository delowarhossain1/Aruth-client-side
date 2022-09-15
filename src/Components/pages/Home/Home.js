import React from "react";
import Categories from "./Categories/Categories";
import PopularProducts from "./PopularProducts/PopularProducts";
import Slider from "./Slider/Slider";
import "./Home.css";
import JustForYou from "./JustForYou/JustForYou";
import PageTitle from "../../shared/PageTitle/PageTitle";

const Home = () => {
  return (
    <>
        <PageTitle  text='Online shopping in Bangladesh' />
      <Slider />
      <PopularProducts />
      <Categories />
      <JustForYou />
    </>
  );
};

export default Home;
