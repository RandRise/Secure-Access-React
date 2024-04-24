import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConfirmationForm from "./Components/confirmationForm";
import RegistrationForm from "./Components/registerForm";
import UserLoginForm from "./Components/userLoginForm";
import employeePage from "./Components/employeePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationForm />} />
        <Route path="/login" element={<UserLoginForm/>} />
        <Route path="/employee" element= {<employeePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
