import React from "react";
import { useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "./../../../firebase.init";
import { useNavigate } from 'react-router-dom';
import useAccessToken from './../../../hooks/useAccessToken';
import Loading from "../../shared/Loading/Loading";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";

const ContinueWithSocialMedia = ({setAllErrors}) => {
  const [signInWithGoogle, googleUser, loading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, fbLoading, facebookError] = useSignInWithFacebook(auth);
  const navigate = useNavigate();
  const [accessToken] = useAccessToken(googleUser || facebookUser);
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  // Set errors
  useEffect(()=>{
    setAllErrors(facebookError?.code || googleError?.code)

  }, [googleError, facebookError, setAllErrors]);


  // console.log(facebookError?.code , '-')
  // console.log(googleError?.code , '---')

  
  if(accessToken){
    navigate(from);
  }

  if(loading || fbLoading){
    return <Loading />
  }

  return (
    <div className="flex flex-col  items-center space-y-3 justify-center">
      <button
        className="btn text-lg bg-[#DB4437] border-0 w-full capitalize"
        onClick={() => signInWithGoogle()}
      >
        <i className="fa-brands fa-google mr-2 text-xl"></i>
        Continue with Google
      </button>
      <button className="btn text-lg bg-[#3b5998] border-0 w-full capitalize" onClick={()=> signInWithFacebook()}>
        <i className="fa-brands fa-facebook-f mr-2 text-xl"></i>
        Continue with Facebook
      </button>
    </div>
  );
};

export default ContinueWithSocialMedia;
