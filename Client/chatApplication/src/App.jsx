import { useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authUser } from "./components/recoil/AuthContext";
function App() {
  const auth = useRecoilValue(authUser);
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* <Route path="/" element={auth ? <Home /> : <Navigate to={"/login"}/>} />
            <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={auth ? <Navigate to="/" /> : <Signup />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
