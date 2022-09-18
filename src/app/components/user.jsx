import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ users, setUsers }) => {
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        <Qualitie user={user} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td>
        <Bookmark user={user}/>
      </td>
      <td>
        <button
          onClick={() => handleDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  ));
};

export default User;
