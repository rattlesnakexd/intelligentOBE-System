import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./Pages/AdminHome/AdminHome";
import GenerateResults from "./Pages/GenerateResults/GenerateResults";
import Section from "./Pages/section/section";
import TeacherHome from "./Pages/TeacherHome/TeacherHome";
import UploadSheet from "./Pages/UploadSheet/UploadSheet";
import Login from "./Pages/login/Login";
import "./App.css";

function App() {
  const role = localStorage.getItem('role');
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {role === 'admin' && (
            <>
              <Route path="/master-sheet" element={<AdminHome />} />
              <Route path="/section-sheet" element={<Section />} />
            </>
          )}
          {role === 'teacher' && (
            <>
              <Route path="/generate-sheets" element={<TeacherHome />} />
              <Route path="/progress-sheet" element={<UploadSheet />} />
              <Route path="/generate-results" element={<GenerateResults />} />
            </>
          )}
          <Route path="/" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
