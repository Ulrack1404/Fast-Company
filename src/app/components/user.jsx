import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import api from "../api";
import UserData from "./userData";

const User = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    console.log(user);

    return <>{user ? <UserData user={user} /> : <h1>Loading</h1>}</>;
};
User.propTypes = {
    id: PropTypes.string.isRequired
};

export default User;
