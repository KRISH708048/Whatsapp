import React from "react";
import SearchBar from "./SearchBar";
import Conversations from "./Conversations";
import FunctionalButtons from "./FunctionalButtons";

const Sidebar = () => {
  return (
    <div className="flex ">
      <FunctionalButtons />
      <div className="divider"></div>

      <div className="flex flex-col">
        <div>
          <SearchBar />
          <div className="divider px-3" ></div>
        </div>
        <div>
          <Conversations />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
