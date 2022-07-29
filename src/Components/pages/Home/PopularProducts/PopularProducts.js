import React from 'react';
import image from "../../../../Images/slider.jpg";

const PopularProducts = () => {
    return (
        <section className='py-3'>
            <h2 className='text-2xl uppercase mb-5'>Popular products</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                <div className='bg-white cursor-pointer shadow rounded'>
                    <img src={image} alt="" />

                    <div className='p-2 mt-3'>
                        <h2 className='text-lg'>Lorem ipsum dolor sit amet consectetur.....</h2>
                        <h3 className='text-2xl mt-1'>$120</h3>
                        <h4 className='text-sm text-gray-400'><strike>$22</strike> - 65%</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularProducts;