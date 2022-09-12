import React from 'react';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';
import Loading from '../../../../shared/Loading/Loading';

const MyProfile = () => {
    const [user, loading] = useAuthState(auth);
    const [address, setAddress] = useState({});

    useEffect(()=>{
        const URL = `http://localhost:5000/my-info?email=${user?.email}`;

        if(user?.email){
            fetch(URL, {
                headers : {
                    auth : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(res => setAddress(res));
        }
    }, [user]);

    if(loading){
        return <Loading />
    }

    return (
        <section className=''>
            <div className='flex flex-col lg:flex-row space-x-0 lg:space-x-5'>
                <div className='bg-gray-50 flex-1 p-2 rounded shadow'>
                    <h5 className='text-lg font-semibold mb-2'>Personal Profile </h5>

                    <img src={user?.photoURL} alt="profile" className=' w-20 h-20 rounded-full mx-auto mb-2' />
                    <h5 className='text-center'>{user?.displayName}</h5>
                    <h5 className='text-center'>{user?.email}</h5>
                </div>

                <div className='bg-gray-50 flex-1 p-2 rounded shadow'>
                    <h5 className='text-lg font-semibold mb-2'>Address Book | <span className='text-blue-400 cursor-pointer'>Edit</span></h5>

                    <h5>{address?.name}</h5>
                    <h5>{address?.email}</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, incidunt.</p>
                </div>
            </div>

            <div>

            </div>
        </section>
    );
};

export default MyProfile;