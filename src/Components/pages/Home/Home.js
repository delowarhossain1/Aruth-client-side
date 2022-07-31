import React from 'react';
import Categories from './Categories/Categories';
import PopularProducts from './PopularProducts/PopularProducts';
import Slider from './Slider/Slider';
import "./Home.css";
import JustForYou from './JustForYou/JustForYou';

const Home = () => {
    return (
        <>
           <Slider />
           <PopularProducts /> 
           <Categories />
           <JustForYou />
        </>
    );
};

export default Home;