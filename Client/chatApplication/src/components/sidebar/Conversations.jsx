import React from "react";
import UserConversation from "./UserConversation";
import useGetConversations from "../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 px-2 flex flex-col max-h-[800px] overflow-y-scroll">
      {conversations.map((e, i) => {
        <UserConversation
          key={e._id}
          conversation={e}
          lastIdx={i == conversations.userFrineds.length}
        />;
      })}
      {/* {conversations.userGroups.map((e, i) => {
        <UserConversation
          key={e._id}
          conversation={e}
          lastIdx={i == conversations.userFrineds.length-1}
        />;
      })} */}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
