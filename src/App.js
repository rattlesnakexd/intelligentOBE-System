import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/AdminHome/AdminHome";
import TeacherHome from "./Pages/TeacherHome/TeacherHome";
import Login from "./Pages/login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/master-sheet" element={<AdminHome />} />
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
