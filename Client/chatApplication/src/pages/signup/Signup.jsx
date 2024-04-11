import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useSignup from "../../components/hooks/useSignup";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const { loading, signup } = useSignup();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = {
      username,
      phoneNumber,
      password,
      confirmPassword,
      gender,
    };
    await signup(inputs);
  };

  return (
    <div className=" items-center justify-center min-w-96 mx-auto ">
      <div className="w-full flex flex-col gap-4 p-8 rounded-lg shadow-md  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
        <h1 className="text-4xl text-center font-bold bg-gradient-to-r via-gray-400 from-blue-800 to-blue-600 inline-block text-transparent bg-clip-text">
          Sign-Up
          {/* <span className='text-blue-500'> ChatApp</span> */}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="">
            <label className="label p-2">
              <span className="text-lg  text-gray-300 label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full  p-4 input input-bordered rounded-2xl h-10"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="">
            <label className="label p-2">
              <span className="text-lg  text-gray-300 label-text">
                Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full p-4 input input-bordered rounded-2xl h-10"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-lg text-gray-300 label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-4 input input-bordered rounded-2xl h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-lg text-gray-300 label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Confirm Password"
              className="w-full p-4 input input-bordered rounded-2xl h-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex gap-6 mx-auto">
            <div className="form-control">
              <label className="cursor-pointer label gap-4">
                <span className="label-text text-lg">Male</span>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio radio-success"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="cursor-pointer label gap-4">
                <span className="label-text text-lg">Female</span>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="radio radio-success"
                />
              </label>
            </div>
          </div>

          <NavLink
            to="/login"
            className="text-md  text-gray-400 text-center hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </NavLink>

          <div className="mx-auto">
            <button className="btn w-48 btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Sign up"
              )}
            </button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
