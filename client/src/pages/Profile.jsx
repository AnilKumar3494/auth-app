import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [img, setImg] = useState(undefined);
  const [imgPercent, setImgPercent] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({});
  // console.log(formData);

  //Uploading new image
  useEffect(() => {
    if (img) {
      handleFileUpload(img);
    }
  }, [img]);

  const handleFileUpload = async (img) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPercent(Math.round(progress));
      },
      (error) => {
        setImgError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <form className="flex flex-col gap-4 items-center">
        {/* Creating upload image feature -- for that we are going to use useRef() hook */}
        {/* Here people can upload anything even if we say accept -- so we use firebase  */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="Profile Picture"
          className="h-24 w-24 rounded-full cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {imgError ? (
            <span className="text-red-600">Invalid File Foramt</span>
          ) : imgPercent > 0 && imgPercent < 100 ? (
            <span>
              Image is uploading:{" "}
              <span className="text-green-400">{imgPercent}%</span>
            </span>
          ) : imgPercent === 100 ? (
            <span className="text-green-400">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
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

        <button className="bg-slate-800 p-2 rounded-lg w-80 hover:opacity-95 disabled:opacity-80">
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
