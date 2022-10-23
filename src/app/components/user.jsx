import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "./quality";

const User = ({ users, id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleSave = () => {
        history.push("/users");
    };

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    console.log(user);

    return (
        <>
            <h1>{user ? user.name : "Loading"}</h1>
            <h2>{user ? `Профессия: ${user.profession.name}` : null}</h2>
            <p>
                {user
                    ? user.qualities.map((qual) => (
                          <Quality key={qual._id} {...qual} />
                      ))
                    : null}
            </p>
            <p>
                {user ? `completedMeetings: ${user.completedMeetings}` : null}
            </p>
            <h2>{user ? `Rate: ${user.rate}` : null}</h2>
            {user ? (
                <button
                    onClick={() => {
                        handleSave();
                    }}
                >
                    Все пользователи
                </button>
            ) : null}
        </>
    );
};
User.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    id: PropTypes.string.isRequired
};

export default User;
