import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
/*
//useNavigate to move to other pages when clicked
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
//using them in submitHandler
//useDispatch is needed and initalize it as const useDipatch = useDipatch()
import { useDispatch, useSelector } from "react-redux";
*/

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  //capturing the changes -
  //1st - add a function [['onChange' attribute with a {handleChange} function]]  to all the inputs that can do the capturing
  //2nd capture them to a const handleChange
  //3rd - but before 2nd step we need save the changes inside a piece of state so for the we use const [formData, setFormData] = useState({})
  //saving all of them in formData state
  const [formData, setFormData] = useState({});

  /*Changing due to redux
    //For loading effect and error
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
 
    Instead of using useState and setting error and loading
    Destruture loading and error and use useSelector((state) => state.user)
    user is the name of our slice in userSlice
  */
  const { loading, error } = useSelector((state) => state.user);
  console.log(error);

  //Navigating to home page if no errors in Sign-in login
  //for that import useNavigate and then initialise it

  const navigate = useNavigate();
  //Intialzing useDispatch
  const dispatch = useDispatch();
  const handleChange = (e) => {
    // ...formData -- the drip operator to save previous data
    //[e.taget.id] is the username and e.target.value would be the data
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  //now sending our data from frontend to backend
  const submitHandler = async (e) => {
    e.preventDefault();
    /* 
    Removing these as we will be using userSlice and redux
    import them from userSlice
      setLoading(true);
      setError(false);
    */

    try {
      //UNCOMMENT THIS LATER if required
      // e.preventDefault();
      /*
        setLoading(true);
        setError(false);
      before request initialize signin success this makes the loading true
      */
      dispatch(signInStart());

      //from index.js authRoute
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      /* 
      changes after redux
      instead of setting       
      setLoading(false);
      we can use the signInSuccess from userSlice
      dispatch(signInSucces(data))
      */

      if (data.success === false) {
        /*
        setError(true);
        using userSlice
        when data.successs not false
        */
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/"); //to navtigate got this from useNavigate()
      // console.log(data);
    } catch (error) {
      /*
      setLoading(false);
      setError(true);
      changed as we are using redux
      */
      dispatch(signInFailure(error));
    }
  };
  //=====FRONT_END======
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="font-bold text-3xl text-center pb-6 pt-6">Sign In</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="E-mail"
          className="bg-slate-100 p-2 rounded-xl"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          className="bg-slate-100 p-2 rounded-xl"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-2 rounded-xl uppercase hover:opacity-95 disabled:opacity-75"
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        <OAuth></OAuth>
      </form>

      <div className="flex gap-1 sign-in-up">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <p className="text-blue-500 font-semibold">Sign-up</p>
        </Link>
      </div>

      <p className="text-red-600 pt-4">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
