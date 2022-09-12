import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleTagChange = (id) => {
    users.map((item) => {
      setUsers((prevState) => prevState.filter((i) => i._id !== id));
    });
  };

  const handleDelete = (userId) => {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleTagChange(userId)}
      >
        delete
      </button>
    );
  };

  const users_12_1 = () => {
    return users.length >= 5 || users.length === 1 ? (
      <span className="badge bg-primary">
        {users.length} человек тусанет с тобой сегодня
      </span>
    ) : (
      <span className="badge bg-primary">
        {users.length} человека тусанут с тобой сегодня 
      </span>
    );
  };

  const users_0 = () => {
    return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
  };

  const renderPhrase = () => {
      return users.length ? users_12_1() : users_0()
  };

  const renderTable = () => {
    return users.map((item) => {
      return (
        <tr key={item._id}>
          <td key={item.name}>{item.name}</td>
          <td key={item}>
            {item.qualities.map((i) => {
              let classesConst = "badge m-2 bg-";
              let classes = classesConst + i.color;
              return (
                <span key={i.name} className={classes}>
                  {i.name}
                </span>
              );
            })}
          </td>
          <td key={item.profession.name}>{item.profession.name}</td>
          <td key={item.completedMeetings}>{item.completedMeetings}</td>
          <td key={item.rate}>{item.rate}/5</td>
          <td key={item._id}>{handleDelete(item._id)}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1>{renderPhrase()}</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </>
  );
};

export default Users;
