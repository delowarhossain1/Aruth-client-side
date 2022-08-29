import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const CategoryProduct = () => {
    const {id} = useParams();

    const {data:products, isLoading} = useQuery(['category-product'], ()=>(
        fetch(`http://localhost:5000/categories-product/${id}`)
        .then(res => res.json())
    ));
    
    

    return (
        <section className='py-5'>
            {id}
        </section>
    );
};

export default CategoryProduct;