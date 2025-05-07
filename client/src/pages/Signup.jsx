// import { auth ,db} from "@/components/firebase";
// import { setDoc,doc } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
// import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import {  signupUser } from "@/redux/authSlice";
// import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {loading} =useSelector(store=>store.auth)
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // try {
    //   dispatch(setLoading(true));
    //   const res = await axios.post(
    //     `${USER_API_END_POINT}/register`,
    //     { name, email, password },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   if (res.data.success) {
    //     navigate("/login");
    //     toast.success(res.data.message);
    //   }
    // } catch (error) {
    //   console.log("Error in the on submit handler", error);
    //   toast.error(error.response?.data?.message );
    // } finally {
    //   dispatch(setLoading(false));
    //   setEmail("")
    //   setName("")
    //   setPassword("")
    // }
    dispatch(signupUser({ name,email, password, navigate }))
  };
  //ye firebase se kiya hain
  // const onSubmitHandler= async(e)=>{
  //   e.preventDefault();
  //   try {
  //     setLoading(true)
  //     await createUserWithEmailAndPassword(auth,email,password)
  //     const user=auth.currentUser
  //     console.log(user);
  //     if(user){
  //       await setDoc(doc(db,"Users",user.uid),{
  //         email:user.email,
  //         name:name
  //       })
  //     }
  //     console.log("User register successfully ")
  //     toast.success("User Signup Successfully")
  //     setName('');
  //     setEmail('');
  //     setPassword('');
  //     navigate("/")
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message)
  //   }finally{
  //     setLoading(false)
  //   }

  // }
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
            Create an account
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
             
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

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

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex cursor-pointer justify-center py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-lg font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="pr-5">
                    <img src="Icon-Google.png" alt="" />
                  </span>
                  Sign up with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have account?
              <a
                href="#"
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
