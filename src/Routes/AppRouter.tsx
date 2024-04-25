// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfirmationForm from "../Components/confirmationForm";
import RegistrationForm from "../Components/registerForm";
import UserLoginForm from "../Components/userLoginForm";
import EmployeePage from "../Components/employeePage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationForm />} />
                <Route path="/confirmation" element={<ConfirmationForm />} />
                <Route path="/login" element={<UserLoginForm />} />
                <Route path="/employee" element={<EmployeePage />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
