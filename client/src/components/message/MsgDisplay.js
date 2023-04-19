import React from "react";
import Avatar from "./../Avatar";

const MsgDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>
      <div className="chat_text">
        Here is me claiming I am not okay but I do not know if its right or not,
        but I am not sure if it works out or not.
      </div>

      <div className="chat_time">April 2023</div>
    </>
  );
};

export default MsgDisplay;
