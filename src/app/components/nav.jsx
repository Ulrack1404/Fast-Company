import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <ul className="nav">
            <li className="nav-item nav-link">
                <Link to="/">Main</Link>
            </li>
            <li className="nav-item nav-link ">
                <Link to="/login">Login</Link>
            </li>
            <li className="nav-item nav-link">
                <Link to="/users">Users</Link>
            </li>
        </ul>
    );
};

export default Nav;
