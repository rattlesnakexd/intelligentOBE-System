import React,{useEffect, useState} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button  from "@mui/material/Button";
import TableComponent from "../../Components/table/table";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'
import Cookies from "js-cookie";
import axios from "axios";


function TeacherHome (){
    const {user} = useUser();
    const name = user?.name;
    const id = user?.employee_id;
    const [sectionData, setSectionData] = useState([]);
    const [adminId, setAdminId] = useState("")

    const navbarItems = [
        { id: 1, label: 'Generate Sheets', url: '/generate-sheets' },
        { id: 2, label: 'Upload Progress Sheets', url: '/progress-sheet' },
        { id: 3, label: 'Generate Reports', url: '/generate-results' },
        { id: 4, label: 'Logout', url: '/' },
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
            label: "Download",
            minWidth: 150,
            align: "center",
            format: (value) => (
                <Button onClick={() => {handleRowData(value)}} variant="contained" color="primary">
                    Download
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

    const handleRowData = (rowData) => {
        handleDownload(rowData, adminId)
      };

      const handleDownload = async (rowData, adminId) => {
        try {
          const dataToSend = { rowData, adminId };
          const response = await axios.post('http://localhost:8000/progressSheet/generate-sheet', dataToSend, {
            responseType: 'blob',
          });
      
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const contentDisposition = response.headers['content-disposition'];
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          let filename = 'download.xlsx'; // Default filename if not found
      
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
      
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      
          console.log("Data sent:", response.data);
        } catch (error) {
          console.error("Error sending data:", error);
        }
      };
      
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
            <h1>Generate Sheets</h1>
            <div className="table">
                <div className="table-data">
                    <TableComponent columns={columns} rows={sectionData}/>
                </div>
            </div>
            </div>
            </div>
        </div>
    );
}

export default TeacherHome;