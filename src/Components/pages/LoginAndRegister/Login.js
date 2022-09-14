import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./inputBox.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ContinueWithSocialMedia from "./ContinueWithSocialMedia";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import useAccessToken from "./../../../hooks/useAccessToken";
import Loading from "../../shared/Loading/Loading";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, loginError] =
    useSignInWithEmailAndPassword(auth);
  const [accessToken] = useAccessToken(user);
  const [displayError, setDisplayError] = useState('');

  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;

    signInWithEmailAndPassword(email, password);
  };

  // After login 
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  // Set error
  useEffect(()=>{
    setAllErrors(loginError?.code);
  }, [loginError])


  // Error list 
  function setAllErrors(error){
      switch(error){
        case 'auth/wrong-password' : 
          setDisplayError('Wrong email & password. Please try again');
          break;

        case 'auth/user-not-found' : 
          setDisplayError('You do not have account. Please create an account.');
          break;

        case 'auth/account-exists-with-different-credential':
          setDisplayError('You have already used this email.');
          break;

        default : 

      }
  }

  if (accessToken) {
    navigate(from);
  }

  // login loading
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-10">
      <div className="w-full lg:w-2/3 mx-auto">

          {loginError && <h2 className="bg-white text-center text-md text-red-500 p-2 mb-2 rounded"><i class="fa-solid fa-triangle-exclamation mr-2"></i> {displayError}</h2>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center shadow-lg rounded-md p-4 bg-white">
          <div>
            <img src='https://i.ibb.co/3RZm0KV/login.jpg' alt="login pic" className="" />

            <ContinueWithSocialMedia setAllErrors={setAllErrors}/>
          </div>

          <div className="text-center">
            <h2 className="text-2xl  text-[#007bff9d] mb-5 font-bold">
              Log in to your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-box w-full border-gray-400"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                />
                {errors && (
                  <label className="label">
                    <span className="label-text-alt hidden">
                      {errors?.email?.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input-box w-full border-gray-400"
                  {...register("password", {
                    min: {
                      value: 6,
                      message: "Password must be 6 character",
                    },
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />

                {errors && (
                  <label className="label">
                    <span className="label-text-alt hidden">
                      {errors?.password?.message}
                    </span>
                  </label>
                )}
              </div>

              <button className="form-btn w-full mt-3">Login</button>
            </form>

            <p className="mt-2 text-center">
              Forget
              <strong>
                <Link to="/forget-password"> password?</Link>
              </strong>
            </p>

            <p className="text-center mt-2">
              Need an account?
              <strong>
                <Link to="/register"> register</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
