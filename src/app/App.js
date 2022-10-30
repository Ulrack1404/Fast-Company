import React from "react";
import Nav from "./components/nav";
import Users from "./components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UsersList from "./layouts/users";

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
                <Redirect to={"/"} />
            </Switch>
        </>
    );
}

export default App;
