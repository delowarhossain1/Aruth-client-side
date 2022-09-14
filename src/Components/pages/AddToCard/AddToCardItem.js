import React from 'react';
import Taka from '../../shared/Taka/Taka';
import useAddToCard from './../../../hooks/useAddToCard';
import { useNavigate } from 'react-router-dom';

const AddToCardItem = ({product, reloadFun, reloadValue, handleCheckoutInfo}) => {
    const {img, name, quantity, total, size, productId} = product;
    const {deleteLocalStorageItem} = useAddToCard();
    const navigate = useNavigate();

    // Handle delete card item
    const handleDeleteItem = (id) => {
        deleteLocalStorageItem(id);
        // Reload 
        // reloadFun(!reloadValue);
    }

    // Send info to proceed
    const handleProceed = () => {
        handleCheckoutInfo(product);
        // Proceed to pay;
        navigate('/checkout')
    }

    return (
        <div className='grid grid-cols-10 p-2 mb-3 items-center justify-center bg-white'>
            <div className='col-span-10 md:col-span-4'>
                <img src={img} alt="product" className='w-28 mb-2 md:mb-0 mx-auto md:mx-0 md:w-14 rounded' />
                <h1 className='mt-1 text-md'>{name?.length > 20 ? name.slice(0, 20) + '...' : name}</h1>
            </div>

            <div className='col-span-10 md:col-span-4'>
                <h5 className='text-md'>Qty : {quantity}</h5>
                <h5 className='text-md'>Size : {size}</h5>
                <h5 className='flex items-center'>Total : <Taka className='w-4 mr-1'/> <span className='text-lg'>{total}</span></h5>
            </div>

            <div className='col-span-10 md:col-span-2 mt-3 md:mt-0 flex justify-end'>
                <button className='bg-red-500 rounded-full w-10 h-10 mr-2' onClick={()=> handleDeleteItem(productId)}><i className="fa-solid fa-trash-can text-white"></i></button>

                <button className='bg-[#303640] rounded-full w-10 h-10' onClick={handleProceed}><i className="fa-brands fa-amazon-pay text-xl text-white"></i></button>
            </div>
        </div>
    );
};

export default AddToCardItem;