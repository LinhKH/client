import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

import { Toaster } from "sonner";

function App() {
  const { currentUser } = useSelector((state) => state?.user);
  
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={currentUser ? <Navigate to={'/profile'} /> : <SignIn />} />
        <Route path="/sign-up" element={currentUser ? <Navigate to={'/profile'} /> : <SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
