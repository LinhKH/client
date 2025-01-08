import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-3 mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Linh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center"
          action=""
        >
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search ..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex items-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to={"/profile"}>
              <img
                className="rounded-full w-7 h-7 object-cover"
                src={currentUser.avatar}
                alt=""
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className=" text-slate-700 hover:underline cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
