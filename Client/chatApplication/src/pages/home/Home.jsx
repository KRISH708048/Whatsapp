import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messageContainer/MessageContainer";
import { useRecoilValue } from "recoil";
import { authUser } from "../../components/recoil/AuthContext";
const Home = () => {
  const auth = useRecoilValue(authUser);
  return (
    <div className="flex h-screen w-full rounded-lg shadow-md">
      <div className="bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur-lg bg-opacity-0">
        <Sidebar />
      </div>

      <div className= " w-full bg-gray-400 bg-clip-padding backdrop-blur-sm backdrop-filter bg-opacity-0">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
