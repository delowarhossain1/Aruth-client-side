import React from 'react';
import ProductCart from '../../../shared/Cart/ProductCart';


const PopularProducts = () => {
    return (
        <section className='py-3'>
            <h2 className='text-2xl uppercase mb-5'>Popular products</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
                <ProductCart />
            </div>
        </section>
    );
};

export default PopularProducts;