import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  return (
    <>
      <SearchStatus users={users} />
      <Users users={users} setUsers={setUsers} />;
    </>
  );
};

export default App;
