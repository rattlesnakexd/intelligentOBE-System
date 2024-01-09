import React,{useState, useEffect} from "react";
import VerticalNavbar from "../../Components/navbar/navbar";
import TopBar from "../../Components/topbar/topbar";
import '../../Assests/Styles.css'
import TableComponent from "../../Components/table/table";
import {useUser} from "../../Context/UserContext"
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Cookies from "js-cookie";
import { Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import ConfirmationModal from "../../Components/modal/ConfirmationModal";
import {TextField} from "@mui/material";

function Section(){
    const {user} = useUser();
    const name = user?.name
    const id = user?.employee_id
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [dataExists, setDataExists] = useState(true);
    const [deleteData, setDeleteData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCode, setSelectedCode] = useState("");
    const [sectionData, setSectionData] = useState([]);
    const [codes, setCodes] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("Spring");
    const [year, setYear] = useState("");

    const navbarItems = [
        { id: 1, label: 'Master Sheet', url: '/master-sheet' },
        { id: 2, label: 'Section Sheet', url: '/section-sheet' },
        { id: 3, label: 'Generate Results', url: '/generate-results'},
        { id: 4, label: 'Logout', url: '/' },
      ];
    const topbarName = 'Admin';
    const columns = [
        {
            id: "course",
            label: "Course",
            minWidth: 270,
            align: "center"
        },
        {
            id: "section",
            label: "Section",
            minWidth: 70,
            align: "center",
        },
        {
            id: "teacher",
            label: "Teacher",
            minWidth: 270,
            align: "center",
        }
    ];

    const handleClose = () => {
        setOpen(false);
      };

      const handleClearData = () => {
        setOpenModal(true)
    };
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('employee_id', id);
        const semesterYear = `${selectedSemester} ${year}`;
        formData.append('semesterYear', semesterYear);
        
        const csrfToken = Cookies.get('csrftoken');
        
        try {
            const response = await axios.post('http://localhost:8000/sectionSheet/upload-excel', formData, {
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

    useEffect(() => {
        const clearData = async () => {
            if (deleteData) {
                const csrfToken = Cookies.get('csrftoken');
                try {
                    const response = await axios.delete('http://localhost:8000/sectionSheet/delete-sections', {
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
                        setSelectedSemester("Spring")
                        setYear("")
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
    }, [deleteData, id]);

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/sectionSheet/get-codes`, {
                    params:{
                        employee_id:id,
                    }, 
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
                if (response.data.codes) {
                    setCodes(response.data.codes);
                    setSelectedCode(response.data.codes[0]);
                }
            } catch (error) {
                console.error("Error fetching codes:", error);
            }
        };
    
        fetchCodes();
    }, [dataExists, id]);

    useEffect(() => {
        const checkSemester = async () => {
            try {
                const response = await axios.get('http://localhost:8000/sectionSheet/check-data', {
                    params: {
                        employee_id: id,
                    },
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
    
                if (response.data.exists) {
                    setDataExists(true);
                } else {
                    setDataExists(false);
                }
            } catch (error) {
                console.error("Error checking semester:", error);
                setDataExists(false);
            }
        };
    
        checkSemester();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/sectionSheet/get-data`, {
                    params: {
                        course_code: selectedCode,
                        employee_id: id,
                    }, 
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                });
                if (response.data) {
                    setSectionData(response.data.sections);
                    const match = sectionData[0].semesterYear.match(/([a-zA-Z]+)\s(\d{4})/);
                    setSelectedSemester(match[1])
                    setYear(match[2])
                }
            } catch (error) {
                console.error("Error fetching section data:", error);
            }
        };
    
        fetchData();
    }, [selectedCode, id]);
    
    const isValidYear = (year) => {
        return year.length === 4 && !isNaN(year) && parseInt(year, 10) > 0;
};

    return(
        <div className="admin-home-container">
            <div className="left">
            <VerticalNavbar items={navbarItems}></VerticalNavbar>
            </div>
            <div className="right">
            <div className="right-top">
            <TopBar items={topbarName} name={name}></TopBar>

            </div>
            <div className="right-bottom">
            <h1>Upload Section Sheet</h1>

            <div className="upload-section">
                {!dataExists && <FormControl variant="outlined" style={{ width: 200, marginRight: 10 }} size="small">
                    <InputLabel htmlFor="semester-select">Semester</InputLabel>
                    <Select
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        label="Semester"
                        inputProps={{
                            name: "semester",
                            id: "semester-select",
                        }}
                    >
                        <MenuItem value="Spring">Spring</MenuItem>
                        <MenuItem value="Fall">Fall</MenuItem>
                        <MenuItem value="Summer">Summer</MenuItem>
                    </Select>
                </FormControl>}
                {!dataExists && <TextField
                    label="Year"
                    variant="outlined"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    style={{ width: 200, marginRight: 10 }}
                    size="small"
                    inputProps={{
                        maxLength: 4
                    }}
                />}
                
                <label className="Upload-Master" htmlFor="file-upload" style={{cursor: !isValidYear(year) ? "not-allowed": "pointer"}}>
                    Upload Sections Sheet
                </label>
                <input 
                    id="file-upload"
                    type="file" 
                    accept=".xlsx, .xls"
                    hidden 
                    onChange={handleFileUpload}
                    disabled={!selectedSemester || !isValidYear(year)}
                />
            </div>

            <div className="lists">
            <FormControl variant="outlined" style={{width: 200}} size="small">
                    <InputLabel htmlFor="course-select">Course Name</InputLabel>
                    <Select
                        value={selectedCode}
                        onChange={(e) => setSelectedCode(e.target.value)}
                        label="Course Name"
                        inputProps={{
                            name: "course",
                            id: "course-select",
                        }}
                    >
                        {codes.map(code => <MenuItem key={code} value={code}>{code}</MenuItem>)}
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
                                <TableComponent columns={columns} rows={sectionData}/>
                            </div>
                        </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error}
                        />
                
            </div> 
            <div>
                    {openModal && 
                    <ConfirmationModal setOpen = {setOpenModal} open = {openModal} setDeleteData = {setDeleteData}/>}
                </div>
            </div>
            
        </div>
    );

}

export default Section;