import React from 'react';
import ProductCart from '../../../shared/Cart/ProductCart';
import { useQuery } from 'react-query';
import Loading from '../../../shared/Loading/Loading';

const JustForYou = () => {

    const {data:products, isLoading } = useQuery(['just-for-you-product'], ()=>(
        fetch(`https://afternoon-cove-39130.herokuapp.com/just-for-you`)
        .then(res => res.json())
    ));

    if(isLoading){
        return <Loading />
    }

    return (
        <section className='py-5'>
            <h2 className='section-heading'>Just For You</h2>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {
                    products.map((product, index) => <ProductCart key={Math.random() * index} product={product}/>)
                }
            </div>
        </section>
    );
};

export default JustForYou;