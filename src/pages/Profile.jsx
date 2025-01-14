import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutStart,
  logOutSuccess,
  logOutFailure,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
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
      const response = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      dispatch(updateUserSuccess(response.data.updatedUser));
      toast.success(response.data.message);
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const response = await axios.delete(
        `/api/user/delete/${currentUser._id}`
      );
      console.log(response);
      dispatch(deleteUserSuccess());
      toast.success(response.data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data.message));
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleLogOut = async () => {
    dispatch(logOutStart());
    try {
      const response = await axios.get("/api/user/signout");
      dispatch(logOutSuccess());
    } catch (error) {
      dispatch(logOutFailure(error.response.data.message));
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const { data } = await axios(`/api/user/listings/${currentUser._id}`);

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
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
          type="email"
          disabled
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
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleLogOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>

      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (<p className="text-center">No Listings</p>)}
    </div>
  );
};

export default Profile;
