import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";

const EditUserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const [data, setData] = useState({
        name: "",
        email: ""
    });
    const params = useParams();
    console.log(user);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            type="email"
                            name="email"
                            value={data.password}
                            onChange={handleChange}
                        />

                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
EditUserPage.propTypes = {
    userId: PropTypes.string
};

export default EditUserPage;
