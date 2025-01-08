import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { toast } from 'sonner';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    image && formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      dispatch(updateUserStart());
      const response = await axios.post(`/api/user/update/${currentUser._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response)
      dispatch(updateUserSuccess(response.data.updatedUser));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
      console.log(error)
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <input
          className="hidden"
          accept="image/*"
          type="file"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={!image ? currentUser.avatar : URL.createObjectURL(image)}
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
          alt=""
        />
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border p-3 rounded-lg"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border p-3 rounded-lg"
          type="email" disabled
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="border p-3 rounded-lg"
          type="password"
          placeholder="Password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
          type="submit"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <span className="text-red-700 mt-5">{ error ? error: ''}</span>
    </div>
  );
};

export default Profile;
