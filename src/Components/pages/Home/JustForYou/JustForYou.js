import React, { useEffect, useState } from 'react';
import ProductCart from '../../../shared/Cart/ProductCart';

const JustForYou = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch('data/products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, [])

    return (
        <section className='py-5'>
            <h2 className='section-heading'>Just For You</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
                {
                    products.map((product, index) => <ProductCart key={Math.random() * index} product={product}/>)
                }
            </div>
        </section>
    );
};

export default JustForYou;