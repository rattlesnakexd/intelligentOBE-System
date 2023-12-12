import React,{useEffect, useState} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button  from "@mui/material/Button";
import TableComponent from "../../Components/table/table";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'
import axios from "axios";
import Cookies from "js-cookie";

function UploadSheet (){
    const {user} = useUser();
    const [sectionData, setSectionData] = useState([]);
    const [adminId, setAdminId] = useState("")
    const name = user?.name;
    const id = user?.employee_id;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/sectionSheet/get-sections`, {
                    params: {
                        employee_id: id,
                    }, 
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
                if (response.data.sections) {
                    setSectionData(response.data.sections);
                    setAdminId(response.data.sections.admin_id)
                }
            } catch (error) {
                console.error("Error fetching section data:", error);
            }
        };
    
        fetchData();
    }, [id]);

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
                    <TableComponent columns={columns} rows={sectionData}/>
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