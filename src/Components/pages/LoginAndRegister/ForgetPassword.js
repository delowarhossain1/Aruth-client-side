import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import Loading from "../../shared/Loading/Loading";
import auth from './../../../firebase.init';
import useAlert from './../../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';
import PageTitle from './../../shared/PageTitle/PageTitle';

const ForgetPassword = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    const {simpleAlertWithConfirmBtn} = useAlert();
    const navigate = useNavigate();
    
    // Handle reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        // Send email 
       await sendPasswordResetEmail(email);

    //    Alert 
        simpleAlertWithConfirmBtn({text : 'Email has been sent. Check your email inbox or spam box.'}, ()=> navigate('/login'));
    }

    if(sending){
        return <Loading />
    }

  return (
    <section className="py-12 flex justify-center items-center">
      <PageTitle text='Forget password' />
      <div className="bg-white shadow-md rounded p-3 w-full md:max-w-sm text-center">
        <i className="fa-solid fa-lock text-5xl text-blue-500"></i>
        <h4 className="text-2xl mt-3 text-gray-500">Forget Password?</h4>
        <h4 className="mt-2 text-gray-400">
          You can reset your password here.
        </h4>

        <form className="mt-5" onSubmit={handleResetPassword}>
          <div className="flex">
            <span className="p-2 bg-gray-300 rounded-tl rounded-bl"><i className="fa-solid fa-envelope text-blue-500 px-1"></i></span>
            <input
              type="email"
              name='email'
              placeholder="email address"
              className="border-2 border-gray-300 w-full p-2 outline-none rounded-tr rounded-br"
              autoFocus
              autoComplete="off"
              required
            />
          </div>
          <button type="submit" className="mt-2 p-2 bg-blue-500 w-full text-white text-lg rounded">Send Email</button>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
