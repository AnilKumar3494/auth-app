import React from "react";
// This imported from react router dom will work similar to our Anchor Tag
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-orange-700 py-5 header">
      <div className="flex justify-between mx-auto px-6">
        {/* //This link also makes header into anchor link */}
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4 font-semibold">
          <Link to="/">
            <li className="hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline">Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
