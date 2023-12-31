import { data } from "autoprefixer";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  //capturing the changes -
  //1st - add a function [['onChange' attribute with a {handleChange} function]]  to all the inputs that can do the capturing
  //2nd capture them to a const handleChange
  //3rd - but before 2nd step we need save the changes inside a piece of state so for the we use const [formData, setFormData] = useState({})
  //saving all of them in formData state
  const [formData, setFormData] = useState({});
  //For loadinf effect and error
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // ...formData -- the drip operator to save previous data
    //[e.taget.id] is the username and e.target.value would be the data
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);

  //now sending our data from frontend to backend
  const submitHandler = async (e) => {
    setLoading(true);
    setError(false);
    try {
      e.preventDefault();
      //from index.js authRoute
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }

      // console.log(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  //=====FRONT_END======
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="font-bold text-3xl text-center pb-6 pt-6">Sign Up</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 p-2 rounded-xl"
          id="username"
          onChange={handleChange}
        />

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
          className="bg-slate-700 text-white font-semibold  p-2 rounded-xl uppercase hover:opacity-95 disabled:opacity-75"
        >
          {loading ? "Loading" : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-1">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <p className="text-blue-500 font-semibold">Sign-in</p>
        </Link>
      </div>

      <p className="text-red-600 pt-4">{error && "Something went wrong!"}</p>
    </div>
  );
}
