import React from 'react';

const CheckoutProductCart = ({item}) => {
    const { img, quantity, total, name, size} = item;

    return (
        <div className='shadow-md rounded p-2 mb-3 flex items-center justify-between'>
            <div>
                <img src={img} alt="product" className='w-16' />
                <h5 className='text-xs'>{name?.length > 20 ? name?.slice(0, 20) +'...' : name}</h5>
            </div>

            <div>
                <h2 className='text-sm mb-1'>Quantity : {quantity}</h2>
                <h2 className='text-sm'>Size : {size}</h2>
            </div>

            <div>
                <h2 className='text-2xl text-orange-500'>${total}</h2>
            </div>
        </div>
    );
};

export default CheckoutProductCart;