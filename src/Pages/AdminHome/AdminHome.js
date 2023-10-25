import React, { useEffect, useState } from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import '../../Assests/Styles.css'
import TableComponent from "../../Components/table/table";
import { useUser } from '../../Context/UserContext';
import axios from "axios";
import Cookies from 'js-cookie';
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import ConfirmationModal from "../../Components/modal/ConfirmationModal";

function AdminHome(props){
    const { user } = useUser();
    const name = user?.name
    const id = user?.employee_id
    const [semester, setSemester] = useState(0);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [courseCodes, setCourseCodes] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [dataExists, setDataExists] = useState(true);
    const [cloData, setCloData] = useState([])



    const handleChange = (event) => {
        setSemester(event.target.value);
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('employee_id', id);
        
        const csrfToken = Cookies.get('csrftoken');
        
        try {
            const response = await axios.post('http://localhost:8000/masterSheet/upload-excel', formData, {
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
                setSemester(1)  
                setDataExists(true)
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
    
        
        event.target.value = "";
    };
    
    
    const handleClose = () => {
        setOpen(false);
      };
      const handleClearData = () => {
        setOpenModal(true)
    };

    useEffect(() => {
        const clearData = async () => {
            if (deleteData) {
                const csrfToken = Cookies.get('csrftoken');
                try {
                    const response = await axios.delete('http://localhost:8000/masterSheet/clear-data', {
                        headers: {
                            'X-CSRFToken': csrfToken
                        },
                        data: {
                            employee_id: id
                        },
                        withCredentials: true,
                    });
    
                    if (response.status === 200) {
                        setError("Data cleared successfully");
                        setDataExists(false);
                    } else {
                        setError("Failed to clear data");
                    }
                } catch (error) {
                    console.error("Error clearing data:", error);
                    if (error.response && error.response.data && error.response.data.error) {
                        setError(error.response.data.error);
                    } else {
                        setError("An error occurred while clearing the data.");
                    }
                } finally {
                    setOpen(true);
                }
            }
        };
    
        clearData();
        setDeleteData(false);
        setSemester(0)
        setSelectedCourse("")
        setCloData([]);
    }, [deleteData, id]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/masterSheet/get-courses', {
                    params: {
                        semester_no: semester,
                        employee_id: id,
                    },
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
    
                if (response.data.codes) {
                    setCourseCodes(response.data.codes);
                } else {
                    setError("Failed to fetch course codes.");
                    setOpen(true);
                }
            } catch (error) {
                console.error("Error fetching course codes:", error);
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred while fetching course codes.");
                }
                setOpen(true);
            }
        };
    
        fetchData();
        console.log(courseCodes)
    }, [semester, id]);

    useEffect(() => {
        if (courseCodes.length > 0) {
            setSelectedCourse(courseCodes[0]);
        }
    }, [courseCodes]);
    
    useEffect(() => {
        const fetchDataForSelectedCourse = async () => {
            const csrfToken = Cookies.get('csrftoken');
            try {
                
                const response = await axios.get('http://localhost:8000/masterSheet/get_clo', {
                    params: {
                        course_code: selectedCourse,
                        employee_id: id,
                    },
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                });
    
             console.log(response.data.clos)
             setCloData(response.data.clos)
    
            } catch (error) {
                console.error("Error fetching data for selected course:", error);
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred while fetching data for the selected course.");
                }
                setOpen(true);
            }
        };
    
        
        fetchDataForSelectedCourse();
    
    }, [selectedCourse, id]);
        
    useEffect(() => {
        const checkSemester = async () => {
            try {
                const response = await axios.get('http://localhost:8000/masterSheet/check-data', {
                    params: {
                        employee_id: id,
                    },
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
    
                if (response.data.exists) {
                    setSemester(1);
                    setDataExists(true);
                } else {
                    setSemester(0);
                    setDataExists(false);
                }
            } catch (error) {
                console.error("Error checking semester:", error);
                setSemester(0);
                setDataExists(false);
            }
        };
    
        checkSemester();
    }, [id]);
    
    
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
                                accept=".xlsx, .xls"
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
                                value={semester != 0?semester: ""}
                                onChange={handleChange}
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
                                label="Course Code"
                                inputProps={{
                                    name: "course",
                                    id: "course-select",
                                }}
                                value={selectedCourse}
                                onChange={(event) => setSelectedCourse(event.target.value)}
                            >
                                {courseCodes.map((course, index) => (
                                    <MenuItem key={index} value={course}>
                                        {course}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="table">
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                            <Button 
                                variant="contained"
                                style={{backgroundColor: dataExists ? "red" : "grey", color: "white", cursor: dataExists ? "pointer": "not-allowed"}}
                                disabled={!dataExists}
                                onClick={handleClearData}
                            >
                                Clear Data
                            </Button>
                            </div>
                            <div>
                                <TableComponent columns={columns} rows={cloData}/>
                            </div>
                        </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error}
                        />
                <div>
                    {openModal && 
                    <ConfirmationModal setOpen = {setOpenModal} open = {openModal} setDeleteData = {setDeleteData}/>}
                </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
