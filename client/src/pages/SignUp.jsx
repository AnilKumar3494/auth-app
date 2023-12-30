import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="font-bold text-3xl text-center pb-6 pt-6">Sign Up</h1>
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          className="bg-slate-100 p-2 rounded-xl"
          id="username"
        />

        <input
          type="text"
          placeholder="E-mail"
          className="bg-slate-100 p-2 rounded-xl"
          id="email"
        />

        <input
          type="password"
          placeholder="Enter your Password"
          className="bg-slate-100 p-2 rounded-xl"
          id="password"
        />

        <button className="bg-slate-700 text-white font-semibold  p-2 rounded-xl uppercase hover:opacity-95 disabled:opacity-75">
          Sign Up
        </button>
      </form>
      <div className="flex gap-1">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <p className="text-blue-500 font-semibold">Sign-in</p>
        </Link>
      </div>
    </div>
  );
}
