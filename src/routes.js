import React from "react";
import { Route } from "react-router-dom";
import EmployeeList from "./Containers/EmployeeList";
import AddEmployeeForm from "./Containers/AddEmployeeForm";
import Login from "./Containers/Login";
import Signup from "./Containers/Signup";

const BaseRouter = () => {
    return (
        <div>
            <Route exact path="/" component={EmployeeList} />
            <Route
                exact
                path="/employee/:employeeId/"
                component={AddEmployeeForm}
            />
            <Route exact path="/addEmployee/" component={AddEmployeeForm} />
            <Route exact path="/login/" component={Login} />
            <Route exact path="/signup/" component={Signup} />
        </div>
    );
};

export default BaseRouter;
