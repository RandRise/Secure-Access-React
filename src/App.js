import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConfirmationForm from "./Components/confirmationForm";
import RegistrationForm from "./Components/registerForm"
import ResendVerificationForm from "./Components/resendConfirmation"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationForm />} />
        <Route path="/resend-verification" element={<ResendVerificationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
