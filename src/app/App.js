import React from "react";
import Nav from "./components/nav";
import Users from "./components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/users/:userId?" exact component={Users} />
            </Switch>
        </>
    );
}

export default App;
