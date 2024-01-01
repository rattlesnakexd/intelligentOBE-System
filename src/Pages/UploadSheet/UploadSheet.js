import React,{useEffect, useState} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button  from "@mui/material/Button";
import TableComponent from "../../Components/table/table";
import { useUser } from "../../Context/UserContext";
import '../../Assests/Styles.css'
import axios from "axios";
import Cookies from "js-cookie";
import { Snackbar } from "@mui/material";

function UploadSheet (){
    const {user} = useUser();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
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
            id: "Upload",
            label: "Upload",
            minWidth: 150,
            align: "center",
            format: (value) => (
                <>
                    <label htmlFor={`file-upload-${value.code}-${value.section}`}>
                        <Button variant="contained" color="primary" component="span" disabled={value.result_uploaded}>
                            Upload
                        </Button>
                    </label>
                    <input
                        id={`file-upload-${value.code}-${value.section}`}
                        type="file"
                        accept=".xlsx, .xls"
                        hidden
                        disabled={value.result_uploaded}
                        onChange={(e) => handleFileUpload(e, value)}
                    />
                </>
            ),            
        },
    ];

    const handleClose = () => {
        setOpen(false);
      };

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

    const handleFileUpload = async (e, section) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('sectionData', JSON.stringify(section));
    
        try {
            const response = await axios.post(`http://localhost:8000/uploadSheet/upload-excel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            });
            if(response.data.message) {  
                setError(response.data.message);  
                setOpen(true);  
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            if(error.response && error.response.data && error.response.data.error) {  
                setError(error.response.data.error);  
                setOpen(true);  
            }else {
                setError("An error occurred while uploading the file.");  
                setOpen(true);  
            }
    }
        e.target.value = "";
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
            <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error}
                        />
        </div>
    );
}

export default UploadSheet;