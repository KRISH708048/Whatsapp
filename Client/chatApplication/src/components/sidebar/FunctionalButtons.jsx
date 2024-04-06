import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
const FunctionalButtons = () => {
  return (
    <div className=" p-2 border-r-2 border-gray-800 ">
      <div className="flex flex-col gap-4 justify-center items-start">
        <div className="btn btn-circle bg-gray-400 bg-clip-padding  bg-opacity-20 text-white">
          <LogoutIcon />
        </div>
        <div className="btn btn-circle bg-gray-400 bg-clip-padding  bg-opacity-20 text-white">
          <GroupIcon />
        </div>
      </div>
    </div>
  );
};

export default FunctionalButtons;
