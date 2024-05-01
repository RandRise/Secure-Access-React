// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmationForm from "../Components/confirmationForm";
import RegistrationForm from "../Components/registerForm";
import UserLoginForm from "../Components/userLoginForm";
import EmployeeList from "../Components/employeeList";
import PrivateRoutes from "./PrivateRoutes";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationForm />} />
                <Route path="confirmation" element={<ConfirmationForm />} />
                <Route path="login" element={<UserLoginForm />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="employee" element={<EmployeeList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;
