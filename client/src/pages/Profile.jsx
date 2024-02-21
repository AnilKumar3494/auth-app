import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <form className="flex flex-col gap-4 items-center">
        <img
          src={currentUser.profilePicture}
          alt="Profile Picture"
          className="h-24 w-24 rounded-full"
        />
        <input
          defaultValue={currentUser.username.replace(/\d/g, "")}
          type="text"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-2 w-80"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          placeholder="e-mail"
          className="bg-slate-100 rounded-lg p-2 w-80"
        />

        {/* <input
          type="password"
          placeholder=""
          className="bg-slate-100 rounded-lg p-2 w-80"
        /> */}

        <button className="bg-slate-700 p-2 rounded-lg w-80 hover:opacity-95 disabled:opacity-80">
          Update Profile
        </button>
      </form>

      <div className="flex justify-between w-80">
        <span className="text-red-600 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-red-600 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  );
}
