import React from "react";
import SendIcon from "@mui/icons-material/Send";

const SendBox = () => {
  return (
    <div className="p-4">
      <form className="flex items-center gap-4">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="btn btn-circle bg-gray-400 bg-clip-padding  bg-opacity-20 text-white"
        >
          {/* <IoSearchSharp className='w-6 h-6 outline-none' /> */}
          <SendIcon fontSize="medium" />
        </button>
      </form>
    </div>
  );
};

export default SendBox;
