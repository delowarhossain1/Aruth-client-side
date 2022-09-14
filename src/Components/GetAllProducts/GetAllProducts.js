import React from 'react';
import { useQuery } from 'react-query';
import ProductCart from '../shared/Cart/ProductCart';
import Loading from '../shared/Loading/Loading';

const GetAllProducts = () => {
    // this data loaded by react query;
    const {data:allProducts, isLoading} = useQuery('allProduct', ()=>(
        fetch('http://localhost:5000/all-products')
        .then(res => res.json())
    ));

    if(isLoading){
        return <Loading />
    }

    return (
        <section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 py-5'>
            {
                allProducts?.map(product => <ProductCart key={product?._id} product={product}/>)
            }
        </section>
    );
};

export default GetAllProducts;