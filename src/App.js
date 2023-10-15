import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Pages/AdminHome/AdminHome";
import GenerateResults from "./Pages/GenerateResults/GenerateResults";
import Section from "./Pages/section/section";
import TeacherHome from "./Pages/TeacherHome/TeacherHome";
import UploadSheet from "./Pages/UploadSheet/UploadSheet";
import Login from "./Pages/login/Login";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/master-sheet" element={<ProtectedRoutes Component={AdminHome}/>} />
          <Route path="/section-sheet" element={<ProtectedRoutes Component={Section}/>} />
          <Route path="/generate-sheets" element={<ProtectedRoutes Component={TeacherHome}/>} />
          <Route path="/progress-sheet" element={<ProtectedRoutes Component={UploadSheet}/>} />
          <Route path="/generate-results" element={<ProtectedRoutes Component={GenerateResults}/>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
