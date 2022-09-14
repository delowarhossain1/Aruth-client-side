import React from 'react';
import Taka from './../../shared/Taka/Taka';

const CheckoutProductCart = ({item}) => {
    const { img, quantity, total, name, size} = item;

    return (
        <div className='shadow-md rounded p-2 mb-3 flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
                <img src={img} alt="product" className='w-24 md:20 mb-2 md:mb-0' />
                <h5 className='text-xs'>{name?.length > 20 ? name?.slice(0, 20) +'...' : name}</h5>
            </div>

            <div>
                <h2 className='text-sm mb-1 mt-2 md:mt-0'>Quantity : {quantity}</h2>
                <h2 className='text-sm'>Size : {size}</h2>
            </div>

            <div>
                <h2 className='text-2xl text-orange-500 mt-3 md:mt-0 flex items-center'><Taka /> <span className='ml-1'>{total}</span></h2>
            </div>
        </div>
    );
};

export default CheckoutProductCart;