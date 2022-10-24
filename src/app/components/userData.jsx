import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useHistory } from "react-router-dom";

const UserData = ({ user }) => {
    const history = useHistory();
    const handleSave = () => {
        history.push("/users");
    };
    return (
        <>
            <h1>{user.name}</h1>
            <h2>Профессия: {user.profession.name}</h2>
            <p>
                {user.qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </p>
            <p>completedMeetings: {user.completedMeetings}</p>
            <h2>Rate: {user.rate}</h2>
            <button
                onClick={() => {
                    handleSave();
                }}
            >
                Все пользователи
            </button>
        </>
    );
};
UserData.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserData;
