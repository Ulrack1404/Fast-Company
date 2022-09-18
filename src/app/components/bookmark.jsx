import React, { useState } from "react";

const Bookmark = ({ user }) => {
  let [status, setStatus] = useState(false);
  const handleClick = () => {
    setStatus(!status);
  };

  return (
    <button onClick={() => handleClick()}>
      <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
    </button>
  );
};

export default Bookmark;
