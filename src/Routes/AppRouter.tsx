// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmationForm from "../Components/Auth/confirmationForm";
import RegistrationForm from "../Components/Auth/registerForm";
import UserLoginForm from "../Components/Auth/userLoginForm";
import EmployeeList from "../Components/Employees/employeeList";
import PrivateRoutes from "./PrivateRoutes";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationForm />} />
                <Route path="confirmation" element={<ConfirmationForm />} />
                <Route path="login" element={<UserLoginForm />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/employee" element={<EmployeeList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;
