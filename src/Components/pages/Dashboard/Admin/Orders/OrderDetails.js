import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';

const OrderDetails = () => {
    const {id} = useParams();
    const [user, loading] = useAuthState(auth);
    const [orderInfo, setOrderInfo] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:5000/order-details/${id}?email=${user?.email}`, {
            headers : {
                auth : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => setOrderInfo(data));
    }, [id, user]);


    if(loading){
        return <Loading />
    }

    const {customer, email, mob, address, zipCode, productImg, productName, productQuantity, status, date, paid, transactionId} = orderInfo;

    return (
        <div>
            <h2>{productName}</h2>
        </div>
    );
};

export default OrderDetails;