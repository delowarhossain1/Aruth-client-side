import React from 'react';
import PopularProducts from './PopularProducts/PopularProducts';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <>
           <Slider />
           <PopularProducts /> 
        </>
    );
};

export default Home;