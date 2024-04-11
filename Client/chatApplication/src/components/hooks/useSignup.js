import React, { useState } from "react";
import toast from "react-hot-toast";
// import { authUser } from "../recoil/AuthContext";
// import { useSetRecoilState } from "recoil";

const useSignup = (inputs) => {
  const [loading, setLoading] = useState(false);
  // const setAuth = useSetRecoilState(authUser);
  const signup = async ({
    username,
    phoneNumber,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      username,
      phoneNumber,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
        const number = parseInt(phoneNumber);
        phoneNumber = number;
      const response = await fetch(
        `http://localhost:5000/api/v1/user/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            phoneNumber,
            password,
            confirmPassword,
            gender,
          }),
        }
      );
      const data = await response.json();
      if(response.status!= 200){
        throw new Error(data.msg);
      }
      // localStorage.setItem('user-info',JSON.stringify(data));
      // setAuth(data);
      // console.log(data);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading,signup };
};

export default useSignup;

function handleInputError({
  username,
  phoneNumber,
  password,
  confirmPassword,
  gender,
}) {
  if (!username || !phoneNumber || !password || !confirmPassword || !gender) {
    toast.error("Some input fields are missing!");
    return false;
  }
  const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);
  if (!isValidPhoneNumber) {
    toast.error("Invalid phone number.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password not matches!");
    return false;
  }
  
  return true;
}
