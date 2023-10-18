import React, { useState } from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import Button from "../../Components/button/button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import './AdminHome.css'
import TableComponent from "../../Components/table/table";
import { useUser } from '../../Context/UserContext';
import axios from "axios";
import Cookies from 'js-cookie';
import { Snackbar } from "@mui/material";

function AdminHome(props){
    const { user } = useUser();
    const name = user?.name
    const id = user?.employee_id
    const [semester, setSemester] = useState(1);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        setSemester(event.target.value);
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;  // Exit if no file is selected
    
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('employee_id', id);  // Add employee_id to formData
        
        const csrfToken = Cookies.get('csrftoken');
        
        try {
            const response = await axios.post('http://localhost:8000/masterSheet/upload-excel/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true,
            });
            
            console.log(response.data);  
            if(response.data.message) {  
                setError(response.data.message);  
                setOpen(true);  
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            if(error.response && error.response.data && error.response.data.error) {  
                setError(error.response.data.error);  
                setOpen(true);  
            } else {
                setError("An error occurred while uploading the file.");  
                setOpen(true);  
            }
        }
    
        // Reset the input value so that user can upload the same file again if needed
        event.target.value = "";
    };
    
    
    const handleClose = () => {
        setOpen(false);
      };

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Logout', url: '/' },
    ];

    const topbarName = "Admin";
    const columns = [
        {
            id: "clos",
            label: "CLOs",
            minWidth: 270,
            align: "center"
        },
        {
            id: "plos",
            label: "PLOs",
            minWidth: 70,
            align: "center"
        },
        {
            id: "plosName",
            label: "PLO Name",
            minWidth: 270,
            align: "center"
        },
    ];
    const data = [
        { id: 1,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 2,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 3,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 4,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 5,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 6,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
        { id: 7,clos: "Example CLO 1", plos: "1", plosName: "Random PLO name" },
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
                    <h1>Upload Master Sheet</h1>
                    <label className="Upload-Master" htmlFor="file-upload">
                        Upload Master Sheet
                        </label>
                        <div style={{marginBottom: 10}}>
                            <input 
                                id="file-upload"
                                type="file" 
                                accept=".xlsx, .xls" // This limits the input to Excel files
                                hidden 
                                onChange={handleFileUpload} 
                            />
                        </div>
                    <div className="lists">
                        <FormControl variant="outlined" style={{width: 200, marginRight: 20}} size="small">
                            <InputLabel htmlFor="semester-select">Semester No</InputLabel>
                            <Select
                                label="Semester No"
                                inputProps={{
                                    name: "semester",
                                    id: "semester-select",
                                }}
                                value={semester} // Set the value to the state
                                onChange={handleChange} // Add the onChange handler
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" style={{width: 200}} size="small">
                            <InputLabel htmlFor="course-select">Course Name</InputLabel>
                            <Select
                                label="Course Name"
                                inputProps={{
                                    name: "course",
                                    id: "course-select",
                                }}
                            >
                                <MenuItem value={1}>Course 1</MenuItem>
                                <MenuItem value={2}>Course 2</MenuItem>
                                <MenuItem value={3}>Course 3</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="table">
                        <div>
                            <TableComponent columns={columns} rows={data}/>
                        </div>
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error}
                        />
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
