import React from "react";
import loginPic from "../../../Images/login.jpg";
import { useForm } from "react-hook-form";
import "./inputBox.css";

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <section className="py-10">
      <div className="w-2/3 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center shadow-lg rounded-md">

            <img src={loginPic} alt="login pic" className="" />

          <div className="bg-white p-3  text-center">
            <h2 className="text-xl uppercase text-[#007bff9d] mb-5">
              Please login
            </h2>

            <form>
              <input
                type="email"
                placeholder="Enter your email"
                class="w-full max-w-xs mb-3 border-gray-400 border-0 input-box"
                {...register("email", {
                    required: true,
                    message : "Email is required"
                  })}
              />

              <input
                type="password"
                placeholder="Enter your password"
                class="input-box max-w-xs w-full  mb-3 border-gray-400"
                {...register("password", {
                   min: {
                     value : 6,
                     message : "Password must be 6 character"
                   },
                   required : {
                     value : true,
                     message : "Password is required"
                   }
                  })}
              />

              <button className="w-full max-w-xs form-btn">Login</button>

            </form>

            <div class="divider my-5 max-w-xs mx-auto">Or continue with</div>

            <div className="flex items-center space-x-4 justify-center">
                <button className="btn text-sm bg-[#DB4437] border-0">
                    <i class="fa-brands fa-google mr-2"></i>
                    Google
                </button>
                <button className="btn text-sm bg-[#3b5998] border-0">
                    <i class="fa-brands fa-facebook-f mr-2"></i>
                    Facebook
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
