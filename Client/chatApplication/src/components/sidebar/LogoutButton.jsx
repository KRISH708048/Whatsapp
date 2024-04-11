import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";
const LogoutButton = () => {
    const {loading,logout} = useLogout();

  return (
    <div className="btn btn-circle bg-gray-400 bg-clip-padding  bg-opacity-20 text-white">
      {!loading ?
        <button onClick={logout}>
        <LogoutIcon />
      </button> :<span className='loading loading-spinner'></span>}
    </div>
  );
};

export default LogoutButton;
