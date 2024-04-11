import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { authUser } from "../recoil/AuthContext";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authUser);
  const login = async ({ username, password }) => {
    const sucesss = handleInputError({ username, password });
    if (!sucesss) return;
    setLoading(true);
    try {

        const res = await fetch(
            `http://localhost:5000/api/v1/user/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username,
                password
              }),
            }
          );
        const data = await res.json();
        if(res.status !== 200)
          throw new Error(data.msg);
        localStorage.setItem('user-info',JSON.stringify(data));
        setAuth(data);
    } catch (err) {
        toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {loading,login};
};

export default useLogin;

function handleInputError({ username, password }) {
  if (!username || !password) {
    toast.error("Some input fields are missing!");
    return false;
  }
  return true;
}
