import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/AdminHome/AdminHome";
import Section from "./Pages/section/section";
import TeacherHome from "./Pages/TeacherHome/TeacherHome";
import Login from "./Pages/login/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/master-sheet" element={<AdminHome />} />
          <Route path="/section-sheet" element={<Section/>} />
          <Route path="/generate-sheet" element={<TeacherHome />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
