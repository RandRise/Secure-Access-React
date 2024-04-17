import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ConfirmationForm from "./Components/confirmationForm";
import RegistrationForm from "./Components/registerForm"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
