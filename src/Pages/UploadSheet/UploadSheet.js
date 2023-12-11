import React from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import TableComponent from "../../Components/table/table";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'

function UploadSheet (){
    const {user} = useUser();
    const name = user?.name;
    const navbarItems = [
        { id: 1, label: 'Generate Sheets', url: '/generate-sheets' },
        { id: 2, label: 'Upload Progress Sheets', url: '/progress-sheet' },
        { id: 3, label: 'Logout', url: '/' },
      ];
    const topbarName = 'Teacher';
    const columns = [
        {
            id: "code",
            label: "Course Code",
            minWidth: 270,
            align: "center"
        },
        {
            id: "course",
            label: "Course Name",
            minWidth: 270,
            align: "center"
        },
        {
            id: "section",
            label: "Section",
            minWidth: 70,
            align: "center"
        },
        {
            id: "teacher",
            label: "Teacher",
            minWidth: 270,
            align: "center"
        },
        {
            id: "download",
            label: "Upload",
            minWidth: 150,
            align: "center",
            format: (value) => (
                <Button variant="contained" color="primary">
                    Upload
                </Button>
            ),
        },
    ];
    const data = [
    
    ];

    return (
        <div className="admin-home-container">
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
                    <TableComponent columns={columns} rows={data}/>
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