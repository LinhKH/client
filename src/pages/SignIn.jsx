import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "password",
  });
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const { error, loading } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart())
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message))
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data?.rest))
      navigate("/");
    } catch (error) {
      console.log(error);
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          value={formData.email}
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="password"
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          { loading ? "Loading..." : "Sign In" }
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2">
        <p>Doesn't Have an account?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign Up
        </Link>
      </div>
      { error && <p className="text-red-500 mt-2">{error}</p> }
    </div>
  );
};

export default SignIn;