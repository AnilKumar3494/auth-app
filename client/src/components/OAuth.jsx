import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  //initializ the dispatch
  const dispatch = useDispatch();

  //Funcation to Google's OAuth
  const handleGoogleClick = async () => {
    try {
      //all the below from firebase - firebase.google.com
      //GoogleAuthProvider() imported from firebase/auth
      const provider = new GoogleAuthProvider(); //import this
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider); //this is for the popup google signin, takes in auth and provider -- auth has to be imported and initalized

      //creating response res
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      //Getting data by converting to JSON
      const data = await res.json();
      //adding this to redux for signinstart - success for this we need to import dispatch from react-redux
      dispatch(signInSuccess(data)); //now using the google login data we create a new user and save in mongDB
      // console.log(data);
    } catch (error) {
      console.log("Cound not connent to Google", error);
    }
  };

  //front-end
  return (
    <button
      //type button because it is inside a form and if not for type='button' it will get submitted
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-2 uppercase hover:opacity-95"
    >
      Continue With Google
    </button>
  );
}
