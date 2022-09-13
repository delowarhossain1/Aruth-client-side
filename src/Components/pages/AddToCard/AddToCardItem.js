import React from 'react';
import Taka from '../../shared/Taka/Taka';
import useAddToCard from './../../../hooks/useAddToCard';

const AddToCardItem = ({product, reloadFun, reloadValue}) => {
    const {img, name, quantity, total, size, productId} = product;
    const {deleteLocalStorageItem} = useAddToCard();

    const handleDeleteItem = (id) => {
        deleteLocalStorageItem(id);

        // Reload 
        reloadFun(!reloadValue);
    }

    return (
        <div className='grid grid-cols-10 p-2 mb-3 items-center justify-center bg-white'>
            <div className=' col-span-4'>
                <img src={img} alt="product" className=' w-12 rounded' />
                <h1 className='mt-1 text-md'>{name?.length > 20 ? name.slice(0, 20) + '...' : name}</h1>
            </div>

            <div className='col-span-4'>
                <h5 className='text-md'>Qty : {quantity}</h5>
                <h5 className='text-md'>Size : {size}</h5>
                <h5 className='flex items-center'>Total : <Taka className='w-4 mr-1'/> <span className='text-lg'>{total}</span></h5>
            </div>

            <div className='col-span-2 flex justify-end'>
                <button className='bg-gray-100 rounded-full w-10 h-10'><i class="fa-solid fa-trash-can" onClick={()=> handleDeleteItem(productId)}></i></button>
            </div>
        </div>
    );
};

export default AddToCardItem;