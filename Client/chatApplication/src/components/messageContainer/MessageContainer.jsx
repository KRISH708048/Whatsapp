import React from "react";
import SendBox from "./SendBox";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] h-full flex flex-col justify-between ">
      {/* Header */}

      <div className=" h-16 flex gap-4 items-center bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 px-4 py-2 mb-2 ">
        <span className='label-text'>To:</span> <span className='text-slate-400 font-bold'>John doe</span>
      </div>

      <Messages />
      <SendBox />
    </div>
  );
};
export default MessageContainer;
