// import { auth } from "@/components/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSuccess, setLoading } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant.js";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {loading,user}= useSelector(store=>store.auth);
  const dispatch= useDispatch()
  const navigate= useNavigate()

  // const [loading,setLoading]=useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.data.success){
        dispatch(loginSuccess(res.data.user))
        
        toast.success(res.data.message)
        navigate("/")
      }

    } catch (error) {
      console.log("Error in the on Submit handler of the Login", error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false))
      setEmail("")
      setPassword("")
    }
  };
  //ye firebase ky through kiya tha login
  // const onSubmitHandler=async(e)=>{
  //   e.preventDefault();
  //   try {
  //     setLoading(true)
  //     await signInWithEmailAndPassword(auth,email,password)

  //     console.log("User Login successfully ")
  //     toast.success("User Login Successfully")
  //     setEmail('');
  //     setPassword('');
  //     navigate("/")
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.success("Incorrect email and password")
  //   }finally{
  //     setLoading(false)
  //   }

  // }
  // useEffect(() => {
  //   dispatch(setLoading(false)); // Reset loading on app start
  // }, [dispatch]);
  return (
    <div className="flex  bg-gray-100">
      <div className="hidden lg:flex flex-1 justify-center items-center p-5">
        <div className="">
          <img
            src="/Side_Image.png"
            alt=""
            height={600}
            width={800}
            className="rounded-lg shadow-lg "
          />
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 px-6 py-12 lg:max-w-md lg:mr-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Login to Exclusive
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your details below
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={onSubmitHandler}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email-phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email or Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="email-phone"
                    name="email-phone"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className=" flex cursor-pointer justify-center w-1/2 py-3  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
                <a href="" className="font-bold text-red-500 cursor-pointer">
                  Forget Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
