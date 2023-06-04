import React from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import Table from "../../Components/table/table";
import "./UploadSheet.css"
import { useLocation } from 'react-router-dom';

function UploadSheet (){
    const location = useLocation();
    const name = location?.state?.name;
    const navbarItems = [
        { id: 1, label: 'Generate Sheets', url: '/generate-sheets' },
        { id: 2, label: 'Upload Progress Sheets', url: '/progress-sheet' },
        { id: 3, label: 'Generate Reports', url: '/generate-results' },
        { id: 4, label: 'Logout', url: '/' },
      ];
    const topbarName = 'Teacher';
    const columns = ["CourseCode", "Course", "Section", "Teacher", "Upload"];
    const data = [
      { CourseCode: "CS-1000", Course: "Programming Fundamentals", Section: "A", Teacher: "XYZ", Upload: <Button label={"Upload Sheet"}></Button>},
      { CourseCode: "CS-1000", Course: "Programming Fundamentals", Section: "B", Teacher: "XYZ", Upload: <Button label={"Upload Sheet"}></Button>},
      { CourseCode: "CS-1000", Course: "Programming Fundamentals", Section: "C", Teacher: "XYZ", Upload: <Button label={"Upload Sheet"}></Button>},
    ];

    return (
        <div className="UploadSheetContainer">
            <div className="left">
            <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
            <div className="right-top">
            <TopBar items={topbarName} name={name}></TopBar>

            </div>
            <div className="right-bottom">
            <h1>Upload Progress Sheets</h1>
            <div className="lists">
            </div>
            <div className="table">
                <div className="table-data">
                    <Table columns={columns} data={data} checkBox={false}></Table>
                </div>
                <div className="table-actions">
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default UploadSheet;